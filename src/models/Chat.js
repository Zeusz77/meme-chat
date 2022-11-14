const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const ChatSchema = new Schema({
    participants: [{
        type: User,
        required: true,
    }],
    name: {
        type: String,
        default: ''.join(participants.map(participant => participant.handle))
    }
});

module.exports = Chat = mongoose.model('chats', ChatSchema);