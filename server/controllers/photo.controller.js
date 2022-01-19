const Photo = require('../models/Photo');
const tokenService = require('../service/token-service');
const { getRes } = require('../service/getResponse');
const fileService = require("../service/file-service");
const User = require("../models/User");

exports.createPhoto = async (req, res) => {
    try {
        const user = req.user;
        const file = req.files.file;
        if(!file) {
            return res.status(200).json(getRes(60, { message: 'File not found' }))
        }
        const fileUrl = await fileService.savePhotos(file, user.id);

        const photo = new Photo({ user: user.id, url: fileUrl, settings: {fileName: file.name, size: file.size} });
        await photo.save();
        return res.status(200).json(getRes(0, { message: 'The photo has been successfully uploaded', data: photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getPhoto = async (req, res) => {
    try {
        const idPhoto = req.params
        const photo = await Photo.findById(idPhoto)
        if (!photo) {
            return res.status(200).json(getRes(37, { message: 'Photo not found' }))
        }
        return res.status(200).json(getRes(0, { data: photo}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.getAllPhotos = async (req, res) => {
    try {
        const user = req.user;
        const photos = await Photo.find({user: user.id}, null, {sort: {createdAt: 'desc'}});
        if (!photos) {
            return res.status(200).json(getRes(404, { message: 'Photos not found' }))
        }
        return res.status(200).json(getRes(0, { data: photos }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.updatePhoto = async (req, res) => {
    try {
        const idPhoto = req.params
        const dataPhoto = req.body
        const photo = await Photo.findByIdAndUpdate(idPhoto.id, dataPhoto, { new: true })
        return res.status(200).json(getRes(0, { message: 'The photo successfully updated', data: photo }))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        const idPhoto = req.params
        const photo = await Photo.findById(idPhoto)
        if (!photo) {
            return res.status(200).json(getRes(37, { message: 'Photo not found' }))
        }
        photo.deletedAt = Date.now()
        await photo.save()
        return res.status(200).json(getRes(0, { message: 'The photo successfully deleted', data: photo}))
    } catch (err) {
        return res.status(400).json(getRes(100, { error: err.message }))
    }
}