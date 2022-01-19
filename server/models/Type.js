const { Schema, model } = require('mongoose');

// Type of print  ex: Full, With border, Polaroid, Insta etc.

const TypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('Type', TypeSchema);