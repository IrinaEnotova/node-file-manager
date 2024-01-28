import getColorizedText from "../cli/getColorizedText.js";
import path from "path";

export default function changeDirectory(action, currentDir, destPath = "") {
  switch (action) {
    case "up":
      try {
        process.chdir(path.join(currentDir, "../"));
      } catch (err) {
        getColorizedText("Operation failed", "error");
      }
      break;
    case "cd":
      if (!destPath) {
        getColorizedText("You should enter correct pathname", "warn");
      } else {
        try {
          process.chdir(destPath);
        } catch (err) {
          getColorizedText("Operation failed", "error");
        }
      }
  }
}
