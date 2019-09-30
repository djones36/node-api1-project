// implement your API here
const express = require("express");

const dp = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("hello world");
});

const port = 8000;
server.listen(port, () => console.log("\nserver running\n"));
