const mongoose = require('mongoose');
const generateToken = require("../../../helpers/generateToken");
//Tạo model
const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token : {
        type:String,
        default : generateToken.generateRandomString(50)
    },
    phone : String,
    avatar : String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt : Date
},{
    timestamps : true
});
//Tham số 1 là tên model
//Tham số 2 schema : cấu trúc của dữ liệu để thêm vào db
//Tham số 3 là tên collection(tên table)
const User = mongoose.model('User', userSchema,"users");
module.exports = User;
