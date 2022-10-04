const express = require('express');

const app = express(); 

app.get('/', (req, res)=>{
    res.status(200).send('Hi!');
});

const port = 3001;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});