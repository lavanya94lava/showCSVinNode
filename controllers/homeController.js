const CSV = require('../models/csvFile');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports.upload = async function(req,res){
    try{
        CSV.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Multer Error",err);
            }
    
            if(req.file){
                CSV.create({
                    avatar: path.join(CSV.avatarPath,'/',req.file.filename),
                    filename: req.file.filename
                });
            }
        });
        return res.redirect('back');
    }
    catch(err){
        res.redirect('back');
    }   
}

module.exports.home  = async function(req,res){
    console.log(path.join(__dirname,'..'));
    let avatars = await CSV.find({});
    return res.render('home',{
        title: "csv",
        avatars:avatars
    });
}
let keys;
let data = [];
module.exports.getCSV = async function(req,res){
    fs.createReadStream(path.join(__dirname,'..','/uploads/csvFiles/avatars',req.params.avatar))
    .pipe(csv())
    .on('data', (row) => {
        console.log(Object.keys(row));
        keys = Object.keys(row);
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

    return res.render('showFile',{
        title: "showFile",
        keys:keys,
        data: data
    });
}