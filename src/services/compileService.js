const createFiles = require("../file-system/createFile");
const random = require("../utils/random");

class CompileService {
  async runCode(req) {
    try {
      const data = {
        src: req.body.src,
        stdin: req.body.stdin,
        lang: req.body.lang,
        filename: "Test" + random(10),
      };
      if (data.src && data.lang) {
        return await createFiles(data);
      } else {
        return { output: "Invalid Request", status: "Invalid Request" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = CompileService;
