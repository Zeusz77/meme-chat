const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const app = express();

// DB configuration
const db =  require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(()=>{console.log('Connected to MongoDB')})
    .catch(err=>{console.log('Error connecting to MongoDB: ' + err.message)});

app.get(`/`, (req, res)=> res.send('Hello!'));

app.use('/api/users', users);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port: ${port}`));