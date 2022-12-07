const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const ChatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }],
    name: {
        type: String,
        default: 'New Chat',
    },
    lastMessage: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});

module.exports = Chat = mongoose.model('chats', ChatSchema);