const express = require("express");
const router = express.Router();


const controller = require("../controllers/task.controller");
//[GET] /api/v1/tasks
router.get("/",controller.index);
//[GET] /api/v1/tasks/detail:id
router.get("/detail/:id", controller.detail);
module.exports = router;