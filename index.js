// implement your API here
const express = require("express");

const userData = require("./data/db");
//import functions from db.js (   find,  findById,  insert,  update,  remove,)

const server = express();

server.use(express.json());

//Server is alive
server.get("/", (req, res) => {
  res.send(
    "Hello friend! Please join us on our journey through the realm of Node!"
  );
});

//Display Users
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

//Display User by ID
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  userData
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//Add a new User
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if (!userInfo.name || !userInfo.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    userData
      .insert(userInfo)
      .then(user => {
        res.status(201).json("Create", user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

// Delete user by id

server.delete("/api/user/:id", (req, res) => {});

const port = 8000;
server.listen(port, () =>
  console.log("\nserver is running to be with its true love\n")
);
