const User = require('../models/User');
const Order = require('../models/Order');
const { getRes } = require('../service/getResponse');
const tokenService = require('../service/token-service');

module.exports = async function (req, res, next) {
    try {
        const idOrder = req.params
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(403).json(getRes(31, { message: 'Token not found' }))
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const user = await User.findById({ _id: userData.id })
        if (!user) {
            return res.status(401).json(getRes(2, { message: 'User not found ' }))
        }
        const order = await Order.findOne({ _id: idOrder.id }).populate('user')
        if (!order) {
            return res.status(401).json(getRes(34, { message: 'Order not found' }))
        }
        if (user.email !== order.user.email) {
            return res.status(401).json(getRes(33, { message: "You aren't the owner this service" }))
        } else {
            req.user = user
        }
        next()
    } catch (err) {
        return res.status(403).json(getRes(100, { error: err.message }))
    }
}
