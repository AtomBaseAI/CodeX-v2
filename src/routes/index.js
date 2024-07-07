const express = require("express");
const compileController = require("../controller/compileController");
const router = express.Router();

router.get("/", (req, res) => res.status(200).json("Successfully made the GET request"));
router.post("/submit", compileController.runCode);

module.exports = router;
