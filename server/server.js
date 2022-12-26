const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const templates = require('./routes/api/templates');
const chats = require('./routes/api/chats');

const app = express();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB configuration
const db =  require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(()=>{console.log('Connected to MongoDB')})
    .catch(err=>{console.log('Error connecting to MongoDB: ' + err.message)});

// Passport middleware
app.use(passport.initialize());

// Passport configuration
require('./config/passport')(passport);

app.get(`/`, (req, res)=> res.send('Hello!'));

app.use('/api/users', users);
app.use('/api/messages', messages);
app.use('/api/templates', templates);
app.use('/api/chats', chats);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`listening on port: ${port}`));