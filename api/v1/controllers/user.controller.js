const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
const md5 = require("md5");
const generateToken = require("../../../helpers/generateToken");
const sendMailHelper = require("../../../helpers/sendMail");
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

//[POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

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
  const code = generateToken.generateRandomSNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: code,
    expireAt: Date.now(),
  };
  const forgot_password = new ForgotPassword(objectForgotPassword);
  await forgot_password.save();
  //Việc 2 : gửi mã otp qua email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
   Mã OTP xác minh lấy lại mật khẩu là <b>${code}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP`;
  // console.log(email);
  sendMailHelper.sendMail(email, subject, html);
  res.json({
    code: 200,
    message: "Đã gửi mã OTP qua email",
  });
};

//[POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    res.json({
      code: 400,
      message: "OTP không hợp lệ!",
    });
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Xác thực mã OTP thành công!",
    token: token,
  });
};

//[POST] /api/v1/users/password/otp
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token; // dùng ghi xác nhận OTP thành công và trả về json
  //   const token = req.cookies.token; // dùng ghi set cookie bên server
  const password = req.body.password;

  const user = await User.findOne({
    token: token,
  });
  if (md5(password) == user.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu mới khác mậ khẩu cũ!",
      token: token,
    });
    return;
  }
  await User.updateOne(
    {
      token: token,
    },
    {
      password: md5(password),
    }
  );

  res.json({
    code: 200,
    message: "Đổi mật khẩu thành công!",
  });
};
