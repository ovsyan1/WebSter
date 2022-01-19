const Paper = require('../models/Paper');
const Size = require('../models/Size');
const { getRes } = require('../service/getResponse');

exports.createPaper = async (req, res) => {
    try {
        const { name, size, typePaper, density } = req.body
        const getSize = await Size.findOne({ name: size })
        if (!getSize) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        const paper = new Paper({ name, size: getSize, typePaper, density })
        await paper.save()
        return res.status(200).json(getRes(0, { message: 'The paper has been successfully created', data: paper }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getPaper = async (req, res) => {
    try {
        const idPaper = req.params
        const paper = await Paper.findById(idPaper)
        if (!paper) {
            return res.status(200).json(getRes(38, { message: 'Paper not found' }))
        }
        return res.status(200).json(getRes(0, { data: paper}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAll = async (req, res) => {
    try {
        const papers = await Paper.find()
        if (!papers) {
            return res.status(200).json(getRes(404, { message: 'Papers not found'}))
        }
        return res.status(200).json(getRes(0, { data: papers }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updatePaper = async (req, res) => {
    try {
        const idPaper = req.params
        const { name, size, typePaper, density } = req.body
        const getSize = await Size.findOne({ name: size })
        if (!getSize) {
            return res.status(200).json(getRes(40, { message: 'Size not found' }))
        }
        const paper = await Paper.findByIdAndUpdate(idPaper.id, { name, size: getSize, typePaper, density }, { new: true }).populate('size')
        return res.status(200).json(getRes(0, { message: 'The paper has been successfully updated ', data: paper }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.deletePaper = async (req, res) => {
    try {
        const idPaper = req.params
        const paper = await Paper.findById(idPaper)
        if (!paper) {
            return res.status(200).json(getRes(40, { message: 'Paper not found' }))
        }
        paper.deletedAt = Date.now()
        await paper.save()
        return res.status(200).json(getRes(0, { message: 'The paper has been successfully deleted', data: paper }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}