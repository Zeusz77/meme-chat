const fs = require('fs');
const stream = require('stream');
const path = require('path');
const express = require('express');
const router = express.Router();

//TODO: debug the image upload

// An api to recive images from the client and save them to the server under "../../images" folder
// The client will send the image as a binary
// The client will send the image name as a string
router.post('/imageTest', (req, res) => {
    const { image } = req.files;

    if (!image) return res.sendStatus(404);

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    image.mv(__dirname + '../../images' + image.name);

    res.sendStatus(200);
});

module.exports = router;