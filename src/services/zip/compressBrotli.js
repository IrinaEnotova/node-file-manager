import fs from "fs";
import zlib from "zlib";
import path from "path";

import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default function compressBrotli(srcFile, destDir, currentDir) {
  if (!srcFile || !destDir) {
    getColorizedText("You should enter correct names to compress file", "warn");
  } else {
    let finalSrc = srcFile;
    let finalDest = path.join(destDir, `${path.parse(srcFile).base}.br`);
    if (!path.isAbsolute(srcFile)) finalSrc = path.join(currentDir, srcFile);

    fs.stat(finalSrc, (err, stats) => {
      if (err) {
        getColorizedText(`${srcFile} doesn't exist!`, "warn");
      }
      if (stats) {
        fs.stat(finalDest, (err, stats) => {
          if (stats) {
            getColorizedText(`File ${path.parse(srcFile).base}.br has already exist in ${destDir}!`, "warn");
          }
          if (err) {
            const readStream = fs.createReadStream(finalSrc);
            const writeStream = fs.createWriteStream(finalDest);

            const brotli = zlib.createBrotliCompress();

            const stream = readStream.pipe(brotli).pipe(writeStream);

            stream.on("finish", () => {
              getColorizedText("Compressing is successfully done!", "content");
              getCurrentDir(currentDir);
            });
          }
        });
      }
    });
  }
}
