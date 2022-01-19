const Service = require('../models/Service');
const User = require('../models/User');
const tokenService = require('../service/token-service');
const { getRes } = require('../service/getResponse');

module.exports = async function (req, res, next) {
    try {
        const idService = req.params
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(403).json(getRes(31, { message: 'Token not found' }));
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const user = await User.findOne({ _id: userData.id })
        if (!user) {
            return res.status(403).json(getRes(2, { message: 'User not found' }));
        }
        const service = await Service.findOne({ _id: idService.id }).populate('owner')
        if (!service) {
            return res.status(403).json(getRes(32, { message: 'Service not found' }));
        }
        if (user.email !== service.owner.email) {
            return res.status(403).json(getRes(33, { message: "You aren't the owner this service"}))
        } else {
            req.user = user 
        }
        next()
    } catch (err) {
        return res.status(400).json(100, { error: err.message })
    }
}