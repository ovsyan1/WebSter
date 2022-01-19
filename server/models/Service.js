const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema({
    name: { type: String, required: true, unique: true},
    address: { type: String, required: true },
    contacts: { type: String, required: true, unique: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('Service', ServiceSchema)