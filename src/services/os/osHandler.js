import os from "os";

import getColorizedText from "../cli/getColorizedText.js";
import getCurrentDir from "../cli/getCurrentDir.js";

export default function osHandler(flag, currentDir) {
  switch (flag) {
    case undefined:
      getColorizedText("Enter flag to get operating system info", "warn");
    case "--EOL":
      getColorizedText(JSON.stringify(os.EOL), "content");
      getCurrentDir(currentDir);
      break;
    case "--cpus":
      const cpusData = os.cpus();
      const cpusCount = cpusData.length;
      const cpusResult = cpusData.map((cpusItem) => {
        return { model: cpusItem.model, clockRate: cpusItem.speed / 1000 };
      });
      getColorizedText(`Overall amount of CPUS ${cpusCount}`, "content");
      getColorizedText("List of models and clock rates (in GHz)", "content");
      console.log(cpusResult);
      getCurrentDir(currentDir);
      break;
    case "--homedir":
      getColorizedText(`Your home directory is ${os.homedir()}`, "content");
      getCurrentDir(currentDir);
      break;
    case "--username":
      getColorizedText(`Current system user name is ${os.userInfo().username}`, "content");
      getCurrentDir(currentDir);
      break;
    case "--architecture":
      getColorizedText(`CPU architecture is ${os.arch()}`, "content");
      getCurrentDir(currentDir);
      break;
    default:
      getColorizedText("You can enter only flags --EOL, --cpus, --homedir, --username, --architecture", "warn");
  }
}
