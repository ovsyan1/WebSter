const Type = require('../models/Type');
const { getRes } = require('../service/getResponse');

exports.createType = async (req, res) => {
    try {
        const { name } = req.body
        const type = new Type({ name: name })
        await type.save()
        return res.status(200).json(getRes(0, { message: 'The type has been successfully created', data: type }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getType = async (req, res) => {
    try {
        const idType = req.params
        const type = await Type.findById(idType)
        if (!type) {
            return res.status(200).json(getRes(39, { message: 'Type not found' }))
        }
        return res.status(200).json(getRes(0, { data: type }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAllTypes = async (req, res) => {
    try {
        const types = await Type.find()
        if (!types) {
            return res.status(404).json(getRes(404, { message: 'Types not found'}))
        }
        return res.status(200).json(getRes(0, { data: types }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updateType = async (req, res) => {
    try {
        const idType = req.params
        const newData = req.body
        const type = await Type.findByIdAndUpdate(idType.id, newData, { new: true })
        return res.status(200).json(getRes(0, { message: 'The type has been updated', data: type }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.deleteType = async (req, res) => {
    try {
        const idType = req.params
        const type = await Type.findById(idType)
        if (!type) {
            return res.status(200).json(getRes(39, { message: 'Type not found' }))
        }
        type.deletedAt = Date.now()
        await type.save()
        return res.status(200).json(getRes(0, { message: 'The type has been deleted', data: type }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}