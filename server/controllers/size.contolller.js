const Size = require('../models/Size');
const { getRes } = require('../service/getResponse');

exports.createSize = async (req, res) => {
    try {
        const { name, width, height } = req.body
        const size = new Size({ name, width, height })
        await size.save()
        return res.status(200).json(getRes(0, {message: 'The size has been successfully created'}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getSize = async (req, res) => {
    try {
        const idSize = req.params
        const size = await Size.findById(idSize)
        if (!size) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        return res.status(200).json(getRes(0, { data: size }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.find()
        if (!sizes) {
            return res.status(200).json(getRes(404, { message: 'Sizes not found' }))
        }
        return res.status(200).json(getRes(0, { data: sizes }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updateSize = async (req, res) => {
    try {
        const idSize = req.params
        const updateSize = req.body
        const size = await Size.findByIdAndUpdate(idSize, updateSize, { new: true })
        return res.status(200).json(getRes(0, { message: 'The size has been successfully updated', data: size}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.deleteSize = async (req, res) => {
    try {
        const idSize = req.params
        const size = await Size.findById(idSize);
        if (!size) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        size.deletedAt = Date.now()
        await size.save()
        return res.status(200).json(getRes(0, {message: 'The size has been successfully deleted'}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}