const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./User');

const ChatSchema = new Schema({
    name : {
        type: String,
        required: true,
        default: 'New Chat'
    },
    participants: [{
        type: String,
        required: true
    }],
    lastMessage: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Chat = mongoose.model('chats', ChatSchema);