const Order = require('../models/Order');
const User = require('../models/User');
const Service = require('../models/Service');
const { getRes } = require('../service/getResponse');

exports.createOrder = async (req, res) => {
    try {
        // const { comment, service, settings } = req.body
        const user = req.user
        // const user = await User.findById({ _id: userData.id })
        // const findService = await Service.findOne({ name: service })
        // if (!findService) {
        //     return res.status(200).json(getRes(34, { message: 'Service not found'}))
        // }
        const order = new Order({ user: user.id});
        await order.save();
        return res.status(200).json(getRes(0, { message: 'The order has been successfully created', data: order }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}
exports.getOrder = async (req, res) => {
    try {
        const idOrder = req.params
        const order = await Order.findById({ _id: idOrder.id }).populate(['user', 'service'])
        if (!order) {
            return res.status(200).json(getRes(35, { message: 'Order not found' }))
        }
        return res.status(200).json(getRes(0, { message: 'The order successfully received', data: order}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}

exports.getOrders = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({user: user.id}, null, {sort: {createdAt: 'desc'}});
        if (!orders) {
            return res.status(200).json(getRes(404, { message: 'Orders not found'}))
        }
        return res.status(200).json(getRes(0, { data: orders }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const idOrder = req.params
        const { comment, service, settings } = req.body
        // const getService = await Service.findOne({ name: service });
        // if (!getService) {
        //     return res.status(200).json(getRes(34, { message: 'Service not found, please enter correct name'}))
        // }
        const update = {};
        if(comment) {
            update.comment = comment;
        }
        if(service) {
            update.service = service;
        }
        if(settings) {
            update.settings = settings;
        }
        const order = await Order.findByIdAndUpdate(idOrder.id, update, { new: true })
        if (!order) {
            return res.status(200).json(getRes(35, { message: 'Order not found' }))
        }
        return res.status(200).json(getRes(0, { message: 'The order successfully updated', data: order}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        const idOrder = req.params
        const order = await Order.findById(idOrder)
        console.log(order);
        if (!order) {
            return res.status(200).json(getRes(35, { message: 'Order not found' }))
        }
        order.deletedAt = Date.now()
        await order.save()
        return res.status(200).json(getRes(0, { message: 'The order successfully deleted', data: order }))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}