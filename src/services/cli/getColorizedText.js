export default function getColorizedText(text, status) {
  switch (status) {
    case "error":
      console.log("\x1b[31m%s\x1b[0m", text);
      break;
    case "warn":
      console.log("\x1b[33m%s\x1b[0m", text);
      break;
    case "message":
      console.log("\x1b[34m%s\x1b[0m", text);
      break;
  }
}
