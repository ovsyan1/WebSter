const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deleteAt: { type: Date, default: null},
    resetToken: { type: String, default: '' },
    resetTokenExp: { type: Date, default: '' },
    photo: { type: String, default: '' }
});

module.exports = model('User', UserSchema);