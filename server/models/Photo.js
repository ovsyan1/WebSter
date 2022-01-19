const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    url: { type: String, required: true },
    settings: { type: Object },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('Photo', PhotoSchema);