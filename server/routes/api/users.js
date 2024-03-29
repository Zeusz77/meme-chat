const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const Message = require('../../models/Message');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if (user){
            errors.email = 'Email already registered'
            return res.status(400).json(errors);
        }else{
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {id: user.id, handle: user.handle, avatar: user.avatar};

                    jwt.sign(payload, keys.key, {expiresIn: 3600}, (err, token)=>{
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    });
                }
                else{ 
                    return res.status(400).json({password: 'Password mismatch'});
            }})
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
});

// Api route to change user password
router.post('/changePassword', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {id: user.id, handle: user.handle, avatar: user.avatar};

                    jwt.sign(payload, keys.key, {expiresIn: 3600}, (err, token)=>{
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                }else{
                    return res.status(400).json({password: 'Password mismatch'});
                }
            });
    });
});

module.exports = router;