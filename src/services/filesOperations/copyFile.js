import fs from "fs";
import stream from "stream";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default function copyFile(srcFile, destDir, currentDir) {
  if (!srcFile || !destDir) {
    getColorizedText("You should enter correct names to copy file", "warn");
  } else {
    let finalSrc = srcFile;
    let finalDest = path.join(destDir, path.parse(srcFile).base);
    if (!path.isAbsolute(srcFile)) finalSrc = path.join(currentDir, srcFile);

    fs.stat(finalSrc, (err, stats) => {
      if (err) {
        getColorizedText(`${srcFile} doesn't exist!`, "warn");
      }
      if (stats) {
        fs.stat(finalDest, (err, stats) => {
          if (stats) {
            getColorizedText(`File ${path.parse(srcFile).base} has already exist in ${destDir}!`, "warn");
          }
          if (err) {
            const readStream = fs.createReadStream(finalSrc);
            const writeStream = fs.createWriteStream(finalDest);

            stream.pipeline(readStream, writeStream, (err) => {
              if (err) getColorizedText("Operation failed", "error");
            });
            getColorizedText(`Copy of ${srcFile} was successfully created!`, "content");
            getCurrentDir(currentDir);
          }
        });
      }
    });
  }
}
