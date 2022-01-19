const Service = require('../models/Service')
const { getRes } = require('../service/getResponse')

exports.createService = async (req, res) => {
    try {
        const {name, address, contacts, description} = req.body
        const user = req.user
        const service = new Service({ name, address, contacts, owner: user._id, description})
        await service.save()
        return res.status(200).json(getRes(0, { message: 'The service has been successfully created' }))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}

exports.getService = async (req, res) => {
    try {
        const idService = req.params
        const service = await Service.findById(idService.id)
        if (!service) {
            return res.status(200).json(getRes(34, { message: 'Service not found' }))
        }
        return res.status(200).json(getRes(0, {data: service}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}

exports.getAllService = async (req, res) => {
    try {
        const allService = await Service.find();
        if (!allService) {
            return res.status(200).json(getRes(34, { message: 'Services not found' }))
        }
        return res.status(200).json(getRes(0, {data: allService}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}

exports.updateService = async (req, res) => {
    try {
        const idService = req.params
        const data = req.body
        const service = await Service.findByIdAndUpdate(idService.id, data, { new: true }).populate('owner');
        return res.status(200).json(getRes(0, {message: 'The service has been successfully updated', data: service}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}

exports.deleteService = async (req, res) => {
    try {
        const idService = req.params
        const service = await Service.findById({ _id: idService.id })
        if (!service) {
            return res.status(200).json(getRes(34, { message: 'Service not found' }))
        }
        service.deletedAt = Date.now()
        service.active = false
        await service.save()
        return res.status(200).json(getRes(0, {message: 'The service has been successfully deleted'}))
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}