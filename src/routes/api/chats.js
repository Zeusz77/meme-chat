const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
});

// A route to get allcahtrroms belonging to a user
router.get('/user/:userId', (req, res) => {
    Chat.find({participants: req.params.userId})
    .then(chats => {
        res.json(chats);
    })
    .catch(err => res.status(404).json({nochatsfound: 'No chats found'}));
});
