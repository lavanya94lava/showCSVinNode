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
        keys = Object.keys(row);
        data.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

    return res.render('showFile',{
        title: "showFile",
        keys:keys,
        data: data,
        avatar:req.params.avatar
    });
}

let searchArray = [];
module.exports.search = async function(req,res){
    let search = req.body.search;
    search = search.toLowerCase();
    if(data!=null){
        data.forEach((element) =>{
            let temp = element[keys[3]];
            temp = temp.toLowerCase();
            if(temp.indexOf(search)!=-1){
                searchArray.push(element);
            }
        });
    }
    return res.render('showFile',{
        title:'showFile',
        keys:keys,
        data:searchArray,
        avatar:req.params.avatar
    });
}