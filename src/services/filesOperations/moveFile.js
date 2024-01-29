import fs from "fs";
import path from "path";
import stream from "stream";
import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default async function moveFile(srcFile, destDir, currentDir) {
  if (!srcFile || !destDir) {
    getColorizedText("You should enter correct names to move file", "warn");
  } else {
    let finalSrc = srcFile;
    let finalDest = path.join(destDir, path.parse(srcFile).base);
    if (!path.isAbsolute(srcFile)) finalSrc = path.join(currentDir, srcFile);

    fs.stat(finalSrc, (err, stats) => {
      if (err) {
        getColorizedText(`${srcFile} doesn't exist!`, "warn");
      }
      if (stats) {
        fs.stat(finalDest, async (err, stats) => {
          if (stats) {
            getColorizedText(`File ${path.parse(srcFile).base} has already exist in ${destDir}!`, "warn");
          }
          if (err) {
            const readStream = fs.createReadStream(finalSrc);
            const writeStream = fs.createWriteStream(finalDest);

            stream.pipeline(readStream, writeStream, (err) => {
              if (err) getColorizedText("Operation failed", "error");
            });
            try {
              await fs.promises.rm(finalSrc);
            } catch (error) {
              getColorizedText("Operation failed", "error");
            }
            getColorizedText(`${srcFile} was successfully moved to ${destDir}!`, "content");
            getCurrentDir(currentDir);
          }
        });
      }
    });
  }
}
