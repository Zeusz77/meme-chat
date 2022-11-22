const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    numberOfFields: {
        type: Number,
        required: true,
    },
    fields: {
        type: String,
        required: true,
    }
});

module.exports = Image = mongoose.model('templates', TemplateSchema);