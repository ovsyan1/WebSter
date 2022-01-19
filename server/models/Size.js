const { Schema, model } = require('mongoose');

const SizeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('Size', SizeSchema)