const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

// A route to get all messages in given chatroom
router.get('/chat/:chatId', (req, res) => {
    Message.find({chatId: req.params.chatId})
    .then(messages => {
        res.json(messages);
    })
    .catch(err => res.status(404).json({nomessagesfound: 'No messages found'}));
});

module.exports = router;