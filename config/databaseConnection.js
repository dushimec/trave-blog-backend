require("dotenv").config()
const mongoose = require("mongoose");

const Dbconnection = ((req,res) =>{
    mongoose.connect(process.env.DB_URL,
     { useNewUrlParser: true, useUnifiedTopology: true })
     .then(()=>{
        console.log("Dabase estableished");
     })
     .catch((e)=>{
        console.log(e);
     })
})

module.exports = Dbconnection;