const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const ChatSchema = new Schema({
    participants: [{
        type: User,
        required: true,
    }],
    name: {
        type: String
    }
});

module.exports = Chat = mongoose.model('chats', ChatSchema);