const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const routes = require("./routes/index");
const { PORT } = require("./config/server-config");

const server = express();
server.use(express.json());
server.use(cors());
server.use("/", routes);

const startServer = async () => {
  server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
};

// If running locally, start the server
if (process.env.IS_OFFLINE) {
  startServer();
}

// Export the handler for AWS Lambda
module.exports.handler = serverless(server);
