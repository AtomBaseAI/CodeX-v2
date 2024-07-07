const CompileService = require("../services/compileService");

class CompileController {
  constructor() {
    this.compileService = new CompileService();
  }

  runCode = async (req, res) => {
    try {
      const response = await this.compileService.runCode(req);
      return res.status(202).json({
        message: "Successfully ran it",
        data: response,
        err: {},
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
}

module.exports = new CompileController();
