import fs from "fs";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default async function renameFile(oldName, newName, currentDir) {
  if (!oldName || !newName) {
    getColorizedText("You should enter correct names", "warn");
  } else {
    try {
      fs.stat(path.join(currentDir, oldName), async (err) => {
        if (err) {
          getColorizedText(`There is not ${oldName} in current directory!`, "warn");
        }
        fs.stat(path.join(currentDir, newName), async (err) => {
          if (!err) {
            getColorizedText(`${newName} has already existed in current directory!`, "warn");
          }
          if (err) {
            await fs.promises.rename(oldName, newName);
            getColorizedText(`${newName} was successfully renamed!`, "content");
            getCurrentDir(currentDir);
          }
        });
      });
    } catch (error) {
      getColorizedText("Operation failed", "error");
    }
  }
}
