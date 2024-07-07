const path = require("path");
const os = require("os");

const commandMap = (filename, language, tempDir) => {
  switch (language) {
    case "java":
      return {
        exCommand: "java",
        exArgs: [path.join(tempDir, `${filename}.java`)],
      };
    case "cpp":
      return {
        comCommand: "g++",
        comArgs: [
          path.join(tempDir, `${filename}.cpp`),
          "-o",
          path.join(tempDir, `${filename}.out`),
        ],
        exCommand: path.join(tempDir, `${filename}.out`),
      };
    case "py":
      return {
        exCommand: "python3",
        exArgs: [path.join(tempDir, `${filename}.py`)],
      };
    case "c":
      return {
        comCommand: "gcc",
        comArgs: [
          path.join(tempDir, `${filename}.c`),
          "-o",
          path.join(tempDir, `${filename}.out`),
        ],
        exCommand: path.join(tempDir, `${filename}.out`),
      };
    case "js":
      return {
        exCommand: "node",
        exArgs: [path.join(tempDir, `${filename}.js`)],
      };
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

module.exports = { commandMap };
