const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res) => {
    res.json({msg: 'test message'});
});

const Chat = require('../../models/Chat');
const User = require('../../models/User');

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    Chat.find({participants: req.user.id})
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
    let participantIds = [];
    req.body.participants.forEach(participant => {
        User.findOne({handle: participant})
            .then(user => {
                participantIds.push(user._id);
            }
        );
    });
    participantIds.push(req.user.id);

    const newChat = new Chat({
        participants: participantIds,
        name: req.body.name,
    });
    newChat.save()
        .then(chat => res.json(chat))
        .catch(err => res.status(400).json(err));
});

module.exports = router;