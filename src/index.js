import readline from "readline/promises";
import process from "process";
import os from "os";

import getColorizedText from "./services/cli/getColorizedText.js";

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
console.log(`You are currently in ${currentDir}\n`);

// events
rl.on("line", (input) => {
  switch (input) {
    case ".exit":
      rl.close();
    default:
      getColorizedText("Invalid input", "error");
  }
});

rl.on("close", () => {
  getColorizedText(`Thank you for using File Manager, ${username}, goodbye!`, "message");
});
