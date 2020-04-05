const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const path = require('path');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err} in running on port ${port}`);
    }
    console.log(`server is running on port ${port}`);
});