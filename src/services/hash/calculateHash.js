import fs from "fs";
import path from "path";
import { createHash } from "crypto";

import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default async function calculateHash(filePath, currentDir) {
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

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          getColorizedText(`${filePath} doesn't exist`, "warn");
        }
        if (stats) {
          const stream = fs.createReadStream(fullPath, "utf8");

          stream.on("data", (data) => {
            const result = createHash("sha256").update(data).digest("hex");
            getColorizedText(result, "content");
            getCurrentDir(currentDir);
          });
        }
      });
    } catch (err) {
      getColorizedText("Operation failed", "error");
    }
  }
}
