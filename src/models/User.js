const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    sname: {
        type: String,
        required: true,
    },
    born: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
});

module.exports = User = mongoose.model('users', UserSchema);

