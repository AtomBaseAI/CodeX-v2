const fs = require("fs/promises");
const path = require("path");

async function deletingTempFiles() {
  try {
    const files = await fs.readdir(path.join(process.cwd(), "/temp/"));
    await Promise.all(files.map(file => fs.unlink(path.join(process.cwd(), `/temp/${file}`))));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = deletingTempFiles;
