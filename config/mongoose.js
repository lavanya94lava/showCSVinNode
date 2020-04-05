const mongoose = require('mongoose');

//make your db
mongoose.connect(`mongodb://localhost/csv_db`);

//connect it
const db = mongoose.connection;

db.on('error',console.log.bind(console, "Error in connecting to the DB"));

//verify it 
db.once('open',function(){
    console.log("connected to the DB csv_db");
});