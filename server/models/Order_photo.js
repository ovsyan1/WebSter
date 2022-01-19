const { Schema, model } = require('mongoose');

const OrderPhotoSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    photo: { type: Schema.Types.ObjectId, ref: 'Photo' },
    settings: { type: Object
        // type: Schema.Types.ObjectId, ref: 'Paper',
        // type: Schema.Types.ObjectId, ref: 'Size',
        // type: Schema.Types.ObjectId, ref: 'Type',
        // type: Schema.Types.ObjectId, ref: 'Price',
        // type: Date, default: Date.now
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = model('OrderPhoto', OrderPhotoSchema)