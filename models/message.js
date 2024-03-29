const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    msgIdUserId: {type: String}
});

module.exports = mongoose.model('Message', schema);
