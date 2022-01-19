const Service = require('../models/Service');
const User = require('../models/User');
const tokenService = require('../service/token-service');
const { getRes } = require('../service/getResponse');

module.exports = async function (req, res, next) {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(403).json(getRes(31, { message: 'Token not found' }));
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const user = await User.findOne({ _id: userData.id })
        if (!user) {
            return res.status(401).json(getRes(2, {message: 'User not found '}))
        }
        const service = await Service.findOne({ owner: user._id})
        if (service) {
            return res.status(401).json(getRes(400, {message: "You can't have two or more services or you are not the owner"}))
        } else {
            req.user = user   
        }
        next()
    } catch (err) {
        return res.status(400).json(getRes(100, {error: err.message}))
    }
}