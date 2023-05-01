const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    gender: {
        type: String,
        required: true
    },
    knowing: {
        type: String,
        required: true
    },
    confirmSignup: {
        type: Boolean,
        required: true
    },
    emailNews: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Newsletter', schema);