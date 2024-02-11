module.exports.registerAccount = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Vui lòng nhập họ tên!",
    });
    return;
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Vui lòng nhập email!",
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu!",
    });
    return;
  }
 
  next(); 
};

module.exports.loginAccount = (req, res, next) => {
  if (!req.body.email) {
    res.redirect(`back`);
    return;
  }
  if (!req.body.password) {
    res.redirect(`back`);
    return;
  }
  // else{
  //  if(req.body.password.length < 5){
  //   req.flash("error", `Mật khẩu tối thiếu 5 kí tự!`);
  //   res.redirect(`back`);
  //   return;
  //  }
  // }
  //middlerware next()
  next(); //next sang bước kế tiếp
};

module.exports.forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    res.redirect(`back`);
    return;
  }
 
  //middlerware next()
  next(); //next sang bước kế tiếp
};

module.exports.resetPass = async (req, res, next) => {
  if(!req.body.password){
    res.redirect("back");
    return;
  }   
  
  if(!req.body.confirmPassword){
    res.redirect("back");
    return;
  } 

  if(req.body.confirmPassword != req.body.password){
    res.redirect("back");
    return;
  } 
     next();
 };
 