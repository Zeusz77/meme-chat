const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');
const { response } = require('express');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user){
            return res.status(400).json({email: 'Email already registered'});
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
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user) return res.status(404).json({email: 'User not found'});

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {id: user.id, email: user.email, handle: user.handle}

                    jwt.sign(payload, keys.key, {expiresIn: 3600}, (err, token)=>{
                        res.json({
                            success: true,
                            token: 'memechat-auth:' + token
                        })
                    });
                }
                else{ 
                    return res.status(400).json({password: 'Password mismatch'});
            }})
    })
})

module.exports = router;