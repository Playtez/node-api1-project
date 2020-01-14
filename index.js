// implement your API here
const express = require("express");

const cors = require("cors");

const DB = require("./data/db.js");

const server = express();

server.use(express.json());

server.use(cors());

server.get("/", (req, res) => {
  res.send({ hello: "World!" });
});

server.post("/api/users", (req, res) => {
  const dbData = req.body;
  if (!dbData.name || !dbData.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  DB.insert(dbData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  DB.find()
    .then(response => {
      // console.log("response", res);
      res.status(200).json(response);
    })
    .catch(error => {
      // console.log(error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }

  DB.findById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }

  DB.remove(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const dbData = req.body;

  if (!id) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  if (!dbData.name || !dbData.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  DB.update(id, dbData)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});

const port = 8000;
server.listen(port, () => console.log(`/n *** api listening ${port} *** n/`));
