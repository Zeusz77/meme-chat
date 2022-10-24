const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Template = require('./Template');

const MessageSchema = new Schema({
    template: {
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