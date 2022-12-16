const fs = require('fs');
const stream = require('stream');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const Template = require('../../models/Template');
const passport = require('passport');

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

router.post('/upload', passport.authenticate('jwt', {session: false}),(req, res) => {
    upload(req, res, (err) => {
        if (err){
            res.json({error: err});
        }else{
            const newTemplate = new Template({
                name: req.body.name,
                imageName: req.file.filename,
                numberOfFields: req.body.numberOfFields,
                fields: req.body.fields
            });
            newTemplate.save()
            .then(template => res.json(template))
            .catch(err => console.log(err));
        }
    })
});

// get all templates authententicated
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    Template.find()
    .then(templates => res.json(templates))
    .catch(err => console.log(err));
});

// get template image by name
router.get('/images/:imageName', (req, res) => {
    const directoryPath = path.join(__dirname, '../../images');
    const imageName = req.params.imageName;
    const imagePath = path.join(directoryPath, imageName);
    const readStream = fs.createReadStream
    res.sendFile(imagePath);
});


module.exports = router;