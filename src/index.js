import readline from "readline/promises";
import process from "process";
import os from "os";

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
process.stdout.write(`Welcome to the File Manager, ${username}!\n`);

// get current homeDir
let currentDir = os.homedir();
process.stdout.write(`You are currently in ${currentDir}\n`);

// events
rl.on("line", (input) => {
  switch (input) {
    case ".exit":
      rl.close();
  }
  console.log(`Received: ${input}`);
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

// current path
console.log(process.cwd());
