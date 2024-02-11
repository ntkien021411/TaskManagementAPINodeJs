const Task = require("../models/task.model");
//[GET] /api/v1/tasks
//[GET] /api/v1/tasks?status=...&sortKey=title&sortValue=asc
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  //Filter
  if (req.query.status) {
    find.status = req.query.status;
  }

  //Sort
  const sort = {}
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue;
  }
  const task = await Task.find(find)
  .sort(sort);
  
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
