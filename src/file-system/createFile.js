const fs = require("fs").promises;
const path = require("path");
const os = require("os");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
};

async function createFiles(json_msg) {
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `${json_msg.filename}.${extensions[json_msg.lang]}`);

  try {
    await fs.writeFile(filePath, json_msg.src);
    console.log("Source file created");
    const ans = await runCode({ ...json_msg, filePath });
    return ans;
  } catch (error) {
    console.log(error);
    await deletingTempFiles(tempDir);
    throw error;
  }
}

module.exports = createFiles;
