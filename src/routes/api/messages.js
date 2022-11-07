const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

// A rout for a user to get their messages
// TODO: Change so it takes the correct message format
router.get('/messages', passport.authenticate('jwt', {session: false}), (req, res) => {
    Message.find({user: req.user.id})
    .then(messages => {
        if (!messages){
            errors.nomessages = 'No messages found';
            return res.status(404).json(errors);
        }
        res.json(messages);
    })
    .catch(err => res.status(404).json({messages: 'No messages found'}));
});

// A route for a user to send a message
// TODO: Change so it takes the correct message format
router.post('/messages', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newMessage = new Message({
        user: req.user.id,
        text: req.body.text
    });
    newMessage.save()
    .then(message => res.json(message))
    .catch(err => console.log(err));
});

module.exports = router;