import fs from "fs";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default async function addFile(filename, currentDir) {
  if (!filename) {
    getColorizedText("You should enter correct filename", "warn");
  } else {
    try {
      const content = "";
      fs.stat(path.join(currentDir, filename), async (err, stats) => {
        if (err) {
          await fs.promises.writeFile(path.join(currentDir, filename), content);
          getColorizedText("File was successfully created!", "content");
          getCurrentDir(currentDir);
        }
        if (stats) {
          getColorizedText("File has already created, use different filename!", "error");
        }
      });
    } catch (err) {
      getColorizedText("Operation failed", "error");
    }
  }
}
