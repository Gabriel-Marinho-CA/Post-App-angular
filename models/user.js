const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
});

// schema.methods.matchPass = async function (enterPass) {
//     return await bcrypt.compare(enterPass, this.password)
// }
// schema.pre('save', async function (next) {
//     if (!this.isModified("password")) {
//         next()
//     }
//     const salt = await bcrypt.getSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
// })

// schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);