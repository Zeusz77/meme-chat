const mongoose = require('mongoose');

const db = "mongodb+srv://admin:admin@meme-chat.wicw97u.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then((dbo)=>{
    console.log("DB connected")
    },(err)=>{
    console.log(err)
});
