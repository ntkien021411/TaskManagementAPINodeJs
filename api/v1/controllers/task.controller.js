const Task = require("../models/task.model");
const pagination = require("../../../helpers/pagination");
//Qeury/Sort/Pagination
//[GET] /api/v1/tasks
//[GET] /api/v1/tasks?status=...&sortKey=title&sortValue=asc
//[GET] /api/v1/tasks?page=1&limit=3

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  //Filter
  if (req.query.status) {
    find.status = req.query.status;
  }

  //Total Page
  let countTask = await Task.countDocuments(find);
  //PAGINATION
  let initPagination = {
    limitItem: 2,
    currentPage: 1,
  };
  let objectPagination = pagination(req.query, initPagination, countTask);

  //Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const task = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

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
