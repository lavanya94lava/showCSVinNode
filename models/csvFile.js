const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/csvFiles/avatars');

const csvSchema = new mongoose.Schema({
    avatar:{
        type:String
    }
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now());
    }
});

csvSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
csvSchema.statics.avatarPath = AVATAR_PATH;

const CSV = mongoose.model('CSV',csvSchema);
module.exports = CSV;