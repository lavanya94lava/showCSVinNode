const CSV = require('../models/csvFile');
const fs = require('fs');

module.exports.upload = async function(req,res){
    try{
        CSV.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Multer Error",err);
            }
            console.log(req.file);
    
            if(req.file){
                CSV.create({
                    avatar:CSV.avatarPath + '/' + req.file.filename
                });
            }
        });
        return res.redirect('back');
    }
    catch(err){
        res.redirect('back');
    }   
}

let rows = [];
module.exports.home  = async function(req,res){
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data',(row)=>{
            rows.push(row);
        })
        .on('end',()=>{
            console.log("successfully uploaded files",rows);
        })
    let avatars = CSV.find({});
    return res.render('home',{
        title: "csv",
        avatars:avatars
    });
}