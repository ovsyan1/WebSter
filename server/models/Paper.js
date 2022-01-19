const { Schema, model } = require('mongoose');

const PaperSchema = new Schema({
    name: { type: String, required: true, unique: true },
    size: { type: Schema.Types.ObjectId, ref: 'Size', required: true },
    typePaper: { type: String, required: true },
    density: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('Paper', PaperSchema)