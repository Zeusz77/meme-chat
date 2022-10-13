const express = require('express');
const mongoose = require('mongoose');

const app = express(); 
const uri = "mongodb+srv://admin:admin@meme-chat.wicw97u.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then((dbo)=>{
    console.log("DB connected")
    },(err)=>{
    console.log(err)
});


app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

const port = 3001;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});