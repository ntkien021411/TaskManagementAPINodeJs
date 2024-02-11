const Task = require("../models/task.model");
//[GET] /api/v1/tasks
//[GET] /api/v1/tasks?status=...
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const task = await Task.find(find);
  res.json(task);
};

//[GET] /api/v1/detail/:id
module.exports.detail = async (req, res) => {
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
};
