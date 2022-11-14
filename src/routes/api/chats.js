const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
}

router.get('/chats', passport.authenticate('jwt', {session: false}), (req, res) => {
    Chat.find({users: req.user.id})
    .then(chats => {
        if (!chats){
            errors.nochats = 'No chats found';
            return res.status(404).json(errors);
        }
        res.json(chats);
    })
    .catch(err => res.status(404).json({chats: 'No chats found'}));
});

// User creates a new chat
router.post('/createChats', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newChat = new Chat({
        participants: Array(req.body.participants.map(participant => participant.id)),
        text: req.body.text
    });
    newChat.save()
    .then(chat => res.json(chat))
    .catch(err => console.log(err));
});