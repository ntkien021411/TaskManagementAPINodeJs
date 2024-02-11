const Task = require("../models/task.model");
const pagination = require("../../../helpers/pagination");
const search = require("../../../helpers/search");
//Filter/Sort/Pagination/Search
//[GET] /api/v1/tasks
//[GET] /api/v1/tasks?status=...&sortKey=title&sortValue=asc
//[GET] /api/v1/tasks?page=1&limit=3
//[GET] /api/v1/tasks?keyword=...
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  //Filter Status:Trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }

  //Search Title
  let objectSearch = search(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
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

  //Result
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
