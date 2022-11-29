const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const template = require('./Template');

// Message Schema conmtains the Image Schema as a subdocument (embedded document) the text's content and the user's id and the chat's id
const MessageSchema = new Schema({
    template: {
        type: template.schema,
        required: true,
    },
    text: [{
        type: String,
        required: true,
    }],
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chats',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema);