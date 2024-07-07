const runCode = require("./code-runner");
const createFiles = require("../file-system/createFile");

class CompileService {
  async runCode(json_msg) {
    const result = await createFiles(json_msg);
    return result;
  }
}

module.exports = CompileService;
