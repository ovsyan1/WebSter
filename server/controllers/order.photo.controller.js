const OrderPhoto = require('../models/Order_photo');
const Order = require('../models/Order');
const Photo = require('../models/Photo');
const Paper = require('../models/Paper');
const Size = require('../models/Size');
const Type = require('../models/Type');
const Price = require('../models/Price');
const { getRes } = require('../service/getResponse');


exports.createOrderPhoto = async (req, res) => {
    try {
        const { order, photo, settings } = req.body
        const getOrder = await Order.findOne({ number: order })
        if (!getOrder) {
            return res.status(200).json(getRes(35, { message: 'Order not found, please enter correct number' }))
        }
        const getPhoto = await Photo.findOne({ url: photo })
        if (!getPhoto) {
            return res.status(200).json(getRes(37, { message: 'Photo not found, please enter correct url' }))
        }
        const getPaper = await Paper.findOne({ name: settings.paper })
        if (!getPaper) {
            return res.status(200).json(getRes(38, { message: 'Paper not found, please enter correct name' }))
        }
        const getType = await Type.findOne({ name: settings.type })
        if (!getType) {
            return res.status(200).json(getRes(39, { message: 'Type not found, please enter correct name' }))
        }
        const getSize = await Size.findOne({ name: settings.size })
        if (!getSize) {
            return res.status(200).json(getRes(40, { message: 'Size not found, please enter correct name' }))
        }
        const getPrice = await Price.findOne({ name: settings.price })
        if (!getPrice) {
            return res.status(200).json(getRes(41, { message: 'Please enter correct price' }))
        }
        const order_photo = new OrderPhoto({
            order: getOrder,
            photo: getPhoto,
            settings: {
                paper: getPaper,
                size: getSize,
                type: getType,
                price: getPrice
            }
        })
        await order_photo.save()
        return res.status(200).json(getRes(0, { message: 'The OrderPhoto has been successfully created', data: order_photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}
exports.getOrderPhoto = async (req, res) => {
    try {
        const idOrderPhoto = req.params
        const order_photo = await OrderPhoto.findById(idOrderPhoto);
        if (!order_photo) {
            return res.status(200).json(getRes(36, { message: 'Order-Photo not found' }))
        }
        return res.status(200).json(getRes(0, { data: order_photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAllOrderPhotos = async (req, res) => {
    try {
        const order_photos = await OrderPhoto.find()
        if (!order_photos) {
            return res.status(200).json(getRes(404, { message: 'Order_photos not found' }))
        }
        return res.status(200).json(getRes(0, { data: order_photos }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updateOrderPhoto = async (req, res) => {
    try {
        const { order, photo, settings } = req.body
        const idOrderPhoto = req.params
        const getOrder = await Order.findOne({ number: order })
        if (!getOrder) {
            return res.status(200).json(getRes(35, { message: 'Order not found, please enter correct number' }))
        }
        const getPhoto = await Photo.findOne({ url: photo })
        if (!getPhoto) {
            return res.status(200).json(getRes(37, { message: 'Photo not found, please enter correct url' }))
        }
        const getPaper = await Paper.findOne({ name: settings.paper })
        if (!getPaper) {
            return res.status(200).json(getRes(38, { message: 'Paper not found, please enter correct name' }))
        }
        const getType = await Type.findOne({ name: settings.type })
        if (!getType) {
            return res.status(200).json(getRes(39, { message: 'Type not found, please enter correct name' }))
        }
        const getSize = await Size.findOne({ name: settings.size })
        if (!getSize) {
            return res.status(200).json(getRes(40, { message: 'Size not found, please enter correct name' }))
        }
        const getPrice = await Price.findOne({ name: settings.price })
        if (!getPrice) {
            return res.status(200).json(getRes(41, { message: 'Please enter correct price' }))
        }
        const order_photo = await OrderPhoto.findByIdAndUpdate(idOrderPhoto, {
            order: getOrder,
            photo: getPhoto,
            settings: {
                paper: getPaper,
                size: getSize,
                type: getType,
                price: getPrice
            }
        }, { new: true }).populate(['order', 'photo'])
        return res.status(200).json(getRes(0, { message: 'The OrderPhoto has been successfully updated', data: order_photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}
exports.deleteOrderPhoto = async (req, res) => {
    try {
        const idOrderPhoto = req.params
        const order_photo = await OrderPhoto.findById(idOrderPhoto);
        if (!order_photo) {
            return res.status(200).json(getRes(36, { message: 'Order-Photo not found' }))
        }
        order_photo.deleteAt = Date.now()
        await order_photo.save()
        return res.status(200).json(getRes(0, { message: 'The order-photo has been successfully deleted', data: order_photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}