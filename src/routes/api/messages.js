const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/test', (req, res)=> {
    res.json({msg: 'test message'});
})

module.exports = router;