const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    pictureID: {
        type: String,
        required: true,
    },
    fields: [{
        x: Number,
        y: Number,
    }]
});

module.exports = Template = mongoose.model('templates', TemplateSchema);