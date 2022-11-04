const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const image = require('./Image');

const MessageSchema = new Schema({
    imageName: {
        type: "String",
        required: true,
    },
    filler: {
        type: [
            "String"
        ]
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema);