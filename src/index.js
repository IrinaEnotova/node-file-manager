import readline from "readline/promises";
import process from "process";
import os from "os";

import getColorizedText from "./services/cli/getColorizedText.js";
import getCurrentDir from "./services/cli/getCurrentDir.js";
import changeDirectory from "./services/nwd/changeDirectory.js";
import getList from "./services/nwd/getList.js";
import readFile from "./services/filesOperations/readFile.js";
import addFile from "./services/filesOperations/addFile.js";
import renameFile from "./services/filesOperations/renameFile.js";
import copyFile from "./services/filesOperations/copyFile.js";
import moveFile from "./services/filesOperations/moveFile.js";
import removeFile from "./services/filesOperations/removeFile.js";
import osHandler from "./services/os/osHandler.js";
import calculateHash from "./services/hash/calculateHash.js";
import compressBrotli from "./services/zip/compressBrotli.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let username = "Stranger";

const args = process.argv.slice(2);
if (args.length > 0) {
  const usernameArg = args.filter((arg) => {
    return arg.split("=")[0] === "--username";
  });
  if (usernameArg[0].split("=")[1]) username = usernameArg[0].split("=")[1];
}

getColorizedText(`Welcome to the File Manager, ${username}!\n`, "message");

let currentDir = os.homedir();
process.chdir(currentDir);
getCurrentDir(currentDir);

rl.on("line", async (input) => {
  const command = input.split(" ")[0];
  let srcFile;
  let destFile;
  let filePath;

  switch (command) {
    case ".exit":
      rl.close();
    case "up":
      changeDirectory("up", currentDir);
      currentDir = process.cwd();
      getCurrentDir(currentDir);
      break;
    case "cd":
      const destPath = input.split(" ")[1];
      changeDirectory("cd", currentDir, destPath);
      currentDir = process.cwd();
      getCurrentDir(currentDir);
      break;
    case "ls":
      getList(currentDir);
      getCurrentDir(currentDir);
      break;
    case "cat":
      filePath = input.split(" ")[1];
      await readFile(filePath, currentDir);
      getCurrentDir(currentDir);
      break;
    case "add":
      filePath = input.split(" ")[1];
      await addFile(filePath, currentDir);
      break;
    case "rn":
      const oldName = input.split(" ")[1];
      const newName = input.split(" ")[2];
      await renameFile(oldName, newName, currentDir);
      break;
    case "cp":
      srcFile = input.split(" ")[1];
      destFile = input.split(" ")[2];
      copyFile(srcFile, destFile, currentDir);
      break;
    case "mv":
      srcFile = input.split(" ")[1];
      destFile = input.split(" ")[2];
      moveFile(srcFile, destFile, currentDir);
      break;
    case "rm":
      filePath = input.split(" ")[1];
      removeFile(filePath, currentDir);
      break;
    case "os":
      const flag = input.split(" ")[1];
      osHandler(flag, currentDir);
      break;
    case "hash":
      filePath = input.split(" ")[1];
      calculateHash(filePath, currentDir);
      break;
    case "compress":
      srcFile = input.split(" ")[1];
      destFile = input.split(" ")[2];
      compressBrotli(srcFile, destFile, currentDir);
      break;
    default:
      getColorizedText("Invalid input", "error");
  }
});

rl.on("close", () => {
  getColorizedText(`Thank you for using File Manager, ${username}, goodbye!`, "message");
});
