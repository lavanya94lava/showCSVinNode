const CSV = require('../models/csvFile');
const fs = require('fs');
const path = require('path');
//csv parser for parsing the raw data
const csv = require('csv-parser');


//this function is used to upload the while
module.exports.upload = async function(req,res){
    try{
        // get the uploadedAvatar from statics of model file, which contains the values using multer
        CSV.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Multer Error",err);
            }
    
            //if there is a file in your request, use this
            if(req.file){
                // create a new entry in your DB
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

// this will show the home page when our app first starts
module.exports.home  = async function(req,res){
    // find all the links from database
    let avatars = await CSV.find({});
    return res.render('home',{
        title: "csv",
        avatars:avatars
    });
}


let keys;
let data = [];
// make data and keys as global as they would be used in multiple functions
module.exports.getCSV = async function(req,res){
    // use file system library to make modifications and add the file to your structure
    fs.createReadStream(path.join(__dirname,'..','/uploads/csvFiles/avatars',req.params.avatar))
    .pipe(csv())
    .on('data', (row) => {
        keys = Object.keys(row); // get the keys out of the data
        data.push(row); // push the data in the array
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

    return res.render('showFile',{
        title: "showFile", //send data to the views
        keys:keys,
        data: data,
        avatar:req.params.avatar
    });
}

let searchArray = [];
// use an array to get all the values which matches your string search
module.exports.search = async function(req,res){
    try {
        let search = req.body.search;
        search = search.toLowerCase();// convert into lower case so that we can get accurate results
        if(data!=null){
            data.forEach((element) =>{ // loop through each element to compare
                let temp = element[keys[3]]; // fix any column on which you want to run your seach query
                temp = temp.toLowerCase(); //convert into lower case so that we can get accurate results
                if(temp.indexOf(search)!=-1){ // if the array value matches, push it in your array
                    searchArray.push(element);
                }
            });
        }
        return res.render('showFile',{
            title:'showFile',
            keys:keys, //send data to the views
            data:searchArray,
            avatar:req.params.avatar
        });   
    } 
    catch (error) {
        console.log("Error ",err);
        return res.redirect('back');
    }
}

module.exports.sort = async function(req,res){
    try{
        // get index value from params
        let index = req.params.index;
        // if data is not null
        if(data!=null){
            // sort data using built-in fucntions
            data.sort((x,y)=>{
                return x[keys[index]] - y[keys[index]];
            });
            return res.redirect('back');
        }
        else{
            // return if no data is there
            console.log("No data in here");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Error ",err);
        return res.redirect('back');
    }


}