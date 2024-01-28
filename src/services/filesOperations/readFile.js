import fs from "fs";
import streamPromise from "stream/promises";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";

export default async function readFile(filePath, currentDir) {
  if (!filePath) {
    getColorizedText("You should enter correct pathname", "warn");
  } else {
    try {
      let fullPath;
      if (!path.isAbsolute(filePath)) {
        fullPath = path.join(currentDir, filePath);
      } else {
        fullPath = filePath;
      }

      const readStream = fs.createReadStream(fullPath);

      readStream.on("data", (chunk) =>
        process.stdout.write(`${getColorizedText("Content of file", "content")}\n${chunk}\n`)
      );
      await streamPromise.finished(readStream);
      getColorizedText("End of file", "content");
    } catch (err) {
      getColorizedText("Operation failed", "error");
    }
  }
}
