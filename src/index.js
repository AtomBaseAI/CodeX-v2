const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const CompileService = require("./services/compileService");

const app = express();
app.use(bodyParser.json());

const compileService = new CompileService();

app.post("/compile", async (req, res) => {
  try {
    const result = await compileService.runCode(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports.handler = serverless(app);
