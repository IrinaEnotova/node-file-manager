import readline from "readline/promises";
import process from "process";
import os from "os";
import path from "path";

import getColorizedText from "./services/cli/getColorizedText.js";
import getCurrentDir from "./services/cli/getCurrentDir.js";
import changeDirectory from "./services/filesOperations/changeDirectory.js";
import getList from "./services/filesOperations/getList.js";

// create readline
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// username
let username = "Stranger";

const args = process.argv.slice(2);
if (args.length > 0) {
  const usernameArg = args.filter((arg) => {
    return arg.split("=")[0] === "--username";
  });
  if (usernameArg[0].split("=")[1]) username = usernameArg[0].split("=")[1];
}

// greeting
getColorizedText(`Welcome to the File Manager, ${username}!\n`, "message");

// get current homeDir
let currentDir = os.homedir();
process.chdir(currentDir);
getCurrentDir(currentDir);

// events
rl.on("line", (input) => {
  const command = input.split(" ")[0];

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
      break;
    default:
      getColorizedText("Invalid input", "error");
  }
});

rl.on("close", () => {
  getColorizedText(`Thank you for using File Manager, ${username}, goodbye!`, "message");
});
