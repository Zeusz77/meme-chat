const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Jimp = require('jimp');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

// A route to get all messages in given chatroom
router.get('/get', (req, res) => {
    Message.find({chatId: req.params.chatId})
    .then(messages => {
        // return all messages in order of creation from newest to oldest
        res.json(messages.reverse());
    })
    .catch(err => res.status(404).json({nomessagesfound: 'No messages found'}));
});

// Send a message to a chatroom
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newMessage = new Message({
        template : req.body.template,
        text : req.body.text,
        chat : req.params.chat,
        user : req.user.id
    });

    newMessage.save().then(message => res.json(message));
});

// Get a message by id
router.get('/:imageId', (req, res) => {
    Message.findById(req.params.id)
    .then(message => res.sendFile(message.imagePath))
    .catch(err => res.status(404).json({nomessagefound: 'No message found'}));
});

module.exports = router;