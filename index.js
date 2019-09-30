// implement your API here
const express = require("express");

const userData = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send(
    "Hello friend! Please join us on our journey through the realm of Node!"
  );
});

server.get("/api/users", (req, res) => {
  userData
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

const port = 8000;
server.listen(port, () =>
  console.log("\nserver is running to be with its true love\n")
);
