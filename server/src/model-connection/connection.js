const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shubhammohite1187:zc05urz3VoyvWa6a@cluster0.48smogq.mongodb.net/test").then(()=>{console.log("Connection to DB is successfull")}).catch(()=>{
    console.log("Could not connect to DB")
});


