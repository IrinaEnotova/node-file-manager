import fs from "fs";
import path from "path";
import getColorizedText from "../cli/getColorizedText.js";

export default async function getList(currentDir) {
  try {
    const allFiles = await fs.promises.readdir(currentDir);

    let data = [];
    for (let i = 0; i < allFiles.length; i++) {
      const itemInfo = await fs.promises.stat(path.join(currentDir, allFiles[i]));
      const result = { Name: allFiles[i], Type: "unknown" };
      if (itemInfo.isDirectory()) {
        result.Type = "directory";
      } else if (itemInfo.isFile()) {
        result.Type = "file";
      }
      data.push(result);
    }
    console.table(data);
  } catch (error) {
    getColorizedText("Operation failed", "error");
  }
}
