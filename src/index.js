const express = require("express");
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

startServer();
