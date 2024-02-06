import fs from "fs";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default async function removeFile(filePath, currentDir) {
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

      fs.stat(fullPath, async (err, stats) => {
        if (err) {
          getColorizedText(`${filePath} doesn't exist!`, "warn");
        }
        if (stats) {
          await fs.promises.rm(fullPath);
          getColorizedText(`${filePath} was successfully deleted!`, "content");
          getCurrentDir(currentDir);
        }
      });
    } catch (err) {
      getColorizedText("Operation failed", "error");
    }
  }
}
