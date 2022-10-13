const express = require('express');


const app = express(); 
const uri = "mongodb+srv://admin:admin@meme-chat.wicw97u.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

const port = 3001;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});