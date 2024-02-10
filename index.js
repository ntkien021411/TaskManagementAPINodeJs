const express = require("express");
const app = express();

// ENV
require("dotenv").config();
const port = process.env.PORT;

//Connect database
const database = require("./config/database");
database.connect();

const Task = require("./models/task.model");

app.get("/tasks", async (req, res) => {
  const task = await Task.find({
    deleted: false,
  });
  res.json(task);
});
app.get("/tasks/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.find({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("fail");
  }
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
