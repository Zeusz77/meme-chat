const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res) => {
    res.json({msg: 'test message'});
});

const Chat = require('../../models/Chat');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
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
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    // parse the participants from the request body, fins the user ids, and add them to an array, add the current user to the array
    console.log(req.body.participants);
    const participants = req.body.participants.map(participant => {
        return User.findOne({username: participant}).then(user => {
            return user.id;
        });
    });
    participants.push(req.user.id);
    const newChat = new Chat({
        participants: participants,
        name: req.body.name,
    });
    newChat.save()
        .then(chat => res.json(chat))
        .catch(err => res.status(400).json(err));
});

module.exports = router;