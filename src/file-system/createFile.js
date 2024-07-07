const fs = require("fs/promises");
const path = require("path");
const runCode = require("../services/codeRunner");
const deletingTempFiles = require("./deleteFile");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
};

async function createFiles(jsonMsg) {
  try {
    const filePath = path.join(process.cwd(), `/temp/${jsonMsg.filename}.${extensions[jsonMsg.lang]}`);
    await fs.writeFile(filePath, jsonMsg.src);
    const result = await runCode(jsonMsg);
    return result;
  } catch (error) {
    console.error(error);
    await deletingTempFiles();
    throw error;
  }
}

module.exports = createFiles;
