const fs = require("fs").promises;
const path = require("path");
const os = require("os");

async function deletingTempFiles(tempDir) {
  try {
    const files = await fs.readdir(tempDir);
    for (const file of files) {
      await fs.unlink(path.join(tempDir, file));
      console.log("DELETED file -> " + file);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = deletingTempFiles;
