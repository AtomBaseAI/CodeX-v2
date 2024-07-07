const { spawn } = require("child_process");
const path = require("path");
const deletingTempFiles = require("../file-system/deleteFile");

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python3: "py",
  javascript: "js",
};

async function runCode(jsonMsg) {
  try {
    const timeout = 20;
    const { comCommand, comArgs, exCommand, exArgs } = commandMap(jsonMsg.filename, extensions[jsonMsg.lang]);

    if (comCommand) {
      await executeCommand(comCommand, comArgs);
    }

    const result = await executeCommand(exCommand, exArgs, jsonMsg.stdin.toString(), timeout);
    await deletingTempFiles();
    return result;
  } catch (error) {
    console.error(error);
    await deletingTempFiles();
    throw error;
  }
}

function commandMap(filename, language) {
  const tempPath = path.join(process.cwd(), `/temp/${filename}`);
  const commands = {
    java: { exCommand: "java", exArgs: [`${tempPath}.java`] },
    cpp: { comCommand: "g++", comArgs: [`${tempPath}.cpp`, "-o", `${tempPath}.out`], exCommand: `${tempPath}.out` },
    c: { comCommand: "gcc", comArgs: [`${tempPath}.c`, "-o", `${tempPath}.out`], exCommand: `${tempPath}.out` },
    python3: { exCommand: "python3", exArgs: [`${tempPath}.py`] },
    javascript: { exCommand: "node", exArgs: [`${tempPath}.js`] },
  };
  return commands[language];
}

function executeCommand(command, args, input = "", timeout = 20) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args);
    let output = "", error = "";

    const timer = setTimeout(() => {
      process.kill("SIGHUP");
      reject(new Error(`Timed out after ${timeout} seconds`));
    }, timeout * 1000);

    process.stdin.write(input);
    process.stdin.end();

    process.stdout.on("data", data => output += data.toString());
    process.stderr.on("data", data => error += data.toString());

    process.on("exit", () => {
      clearTimeout(timer);
      if (error) {
        reject(new Error(error));
      } else {
        resolve({ output });
      }
    });
  });
}

module.exports = runCode;
