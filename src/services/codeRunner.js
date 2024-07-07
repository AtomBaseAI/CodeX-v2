const { spawn } = require("child_process");
const deletingTempFiles = require("../file-system/deleteFile");
const os = require("os");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
};

async function runCode(json_msg) {
  const tempDir = os.tmpdir();
  
  try {
    const timeout = 20;
    const { comCommand, comArgs, exCommand, exArgs } = commandMap(
      json_msg.filename,
      extensions[json_msg.lang],
      tempDir
    );

    if (comCommand) {
      await new Promise((resolve, reject) => {
        const compiledCode = spawn(comCommand, comArgs || []);
        compiledCode.stderr.on("data", (error) => {
          reject({ status: "Failed", error: error.toString() });
        });
        compiledCode.on("exit", () => {
          resolve();
        });
      });
    }

    const result = await new Promise((resolve, reject) => {
      const exCode = spawn(exCommand, exArgs || []);
      let output = "",
        error = "";

      const timer = setTimeout(async () => {
        exCode.kill("SIGHUP");
        reject({
          status: "Runtime Error",
          error: `Timed Out. Your code took too long to execute, over ${timeout} seconds.`,
        });
      }, timeout * 1000);

      exCode.stdin.write(json_msg.stdin.toString());
      exCode.stdin.end();

      exCode.stdout.on("data", (data) => {
        output += data.toString();
      });

      exCode.stderr.on("data", (data) => {
        error += data.toString();
      });

      exCode.on("exit", () => {
        clearTimeout(timer);
        resolve({ output, error });
      });
    });

    await deletingTempFiles(tempDir);
    return result;
  } catch (error) {
    console.log(error);
    await deletingTempFiles(tempDir);
    throw error;
  }
}

module.exports = runCode;
