const fs = require('fs');
const stream = require('stream');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const Image = require('../../models/Image');

const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
}).single('image');

router.post('/test', (req, res) => {
    res.json({msg: 'test message'});
})

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err){
            res.json({error: err});
        }else{
            const newImage = new Image({
                name: req.file.originalname,
                fields: req.body.fields,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            });
            newImage.save()
            .then(image => res.json({msg: 'image uploaded'}))
            .catch(err => console.log(err));
        }
    })
}),0

// get all images
router.get('/', (req, res) => {
    Image.find()
    .then(images => res.json(images))
    .catch(err => console.log(err));
});


module.exports = router;