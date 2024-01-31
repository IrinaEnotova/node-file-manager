import fs from "fs";
import zlib from "zlib";
import path from "path";

import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default function decompressBrotli(srcFile, destDir, currentDir) {
  if (!srcFile || !destDir) {
    getColorizedText("You should enter correct names to decompress file", "warn");
  } else {
    let finalSrc = srcFile;
    if (!path.isAbsolute(srcFile)) finalSrc = path.join(currentDir, srcFile);
    let finalDest = path.join(destDir, path.parse(srcFile).name);

    if (path.parse(srcFile).ext !== ".br") {
      getColorizedText(`${path.parse(srcFile).base} is not Brotli file`, "warn");
    } else {
      fs.stat(finalSrc, (err, stats) => {
        if (err) {
          getColorizedText(`${path.parse(srcFile).base} doesn't exist!`, "warn");
        }
        if (stats) {
          fs.stat(finalDest, (err, stats) => {
            if (stats) {
              getColorizedText(`File ${path.parse(srcFile).name} has already exist in ${destDir}!`, "warn");
            }
            if (err) {
              const readStream = fs.createReadStream(finalSrc);
              const writeStream = fs.createWriteStream(finalDest);

              const brotli = zlib.createBrotliDecompress();

              const stream = readStream.pipe(brotli).pipe(writeStream);

              stream.on("finish", () => {
                getColorizedText("Decompressing is successfully done!", "content");
                getCurrentDir(currentDir);
              });
            }
          });
        }
      });
    }
  }
}
