const User = require("../models/user.model");
const md5 = require("md5");

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (!existEmail) {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      });
      const data = await user.save();

      const token = data.token;
      res.cookie("token", token);
      res.json({
        code: 200,
        message: "Tạo mới tài khoản thành công!",
        token: token,
      });
    } else {
      res.json({
        code: 400,
        message: "Email đã tồn tại",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo mới tài khoản thất bại!",
    });
  }
};

//[POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    });
    return;
  }
  if (md5(password) != user.password) {
    res.json({
      code: 400,
      message: "Mật khẩu không trùng khớp!",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token,
  });
};
