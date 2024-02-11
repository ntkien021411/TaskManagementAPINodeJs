const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../../../validates/client/user.validate");
router.post("/register",validate.registerAccount,controller.register);

// router.get("/detail/:id", controller.detail);

// router.patch("/change-status/:id", controller.changeStatus);

// router.patch("/change-multi", controller.changeMulti);

// router.post("/create", controller.create);

// router.patch("/edit/:id", controller.edit);

// router.delete("/delete/:id", controller.delete);
module.exports = router;