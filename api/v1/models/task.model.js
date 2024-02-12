const mongoose = require('mongoose');

//Tạo model
const taskSchema = new mongoose.Schema({
    title:String,
    status:String,
    content:String,
    createdBy:String,
    listUser:Array,
    taskParenId:String,
    timeStart:Date,
    timeFinish:Date,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date
},{
    timestamps : true
});
//Tham số 1 là tên model
//Tham số 2 schema : cấu trúc của dữ liệu để thêm vào db
//Tham số 3 là tên collection(tên table)
const Task = mongoose.model('Task', taskSchema,"tasks");
module.exports = Task;
