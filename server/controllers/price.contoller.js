const Price = require('../models/Price');
const Service = require('../models/Service');
const Paper = require('../models/Paper');
const Size = require('../models/Size');
const Type = require('../models/Type');
const { getRes } = require('../service/getResponse');


exports.createPrice = async (req, res) => {
    try {
        const { service, paper, size, type, price } = req.body
        const findService = await Service.findOne({ name: service })
        if (!service) {
            return res.status(200).json(getRes(34, { message: 'Service not found' }))
        }
        const findPaper = await Paper.findOne({ name: paper })
        if (!paper) {
            return res.status(200).json(getRes(38, { message: 'Paper not found' }))
        }
        const findSize = await Size.findOne({ name: size })
        if (!size) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        const findType = await Type.findOne({ name: type })
        if (!type) {
            return res.status(200).json(getRes(39, { message: 'Type not found' }))
        }
        const priceModel = new Price({
            service: findService,
            paper: findPaper,
            size: findSize,
            type: findType,
            price
        })
        await priceModel.save()
        return res.status(200).json(getRes(0, { message: 'The price has been successfully created', data: priceModel}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getPrice = async (req, res) => {
    try {
        const idPrice = req.params
        const price = await Price.findById(idPrice)
        if (!price) {
            return res.status(200).json(getRes(41, { message: 'Price not found' }))
        }
        return res.status(200).json(getRes(0, { data: price}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAllPrices = async (req, res) => {
    try {
        const prices = await Price.find()
        if (!prices) {
            return res.status(200).json(getRes(404, { message: 'Prices not found' }))
        }
        return res.status(200).json(getRes(0, { data: prices }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updatePrice = async (req, res) => {
    try {
        const idPrice = req.params
        const { service, paper, size, type, price } = req.body
        const findService = await Service.findOne({ name: service })
        if (!service) {
            return res.status(200).json(getRes(34, { message: 'Service not found' }))
        }
        const findPaper = await Paper.findOne({ name: paper })
        if (!paper) {
            return res.status(200).json(getRes(38, { message: 'Paper not found' }))
        }
        const findSize = await Size.findOne({ name: size })
        if (!size) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        const findType = await Type.findOne({ name: type })
        if (!type) {
            return res.status(200).json(getRes(39, { message: 'Type not found' }))
        }
        const priceData = await Price.findByIdAndUpdate(idPrice.id, {
            service: findService,
            paper: findPaper,
            size: findSize,
            type: findType,
            price
        }, { new: true })
        return res.status(200).json(getRes(0, {message: 'The price has been successfully updated', data: priceData}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.deletePrice = async (req, res) => {
    try {
        const idPrice = req.params
        const price = await Price.findById(idPrice)
        if (!price) {
            return res.status(200).json(getRes(41, { message: 'Price not found' }))
        }
        price.deleteAt = Date.now()
        await price.save()
        return res.status(200).json(getRes(0, { message: 'The price has been successfully deleted', data: price }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}