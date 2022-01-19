const User = require('../models/User');
const tokenService = require('../service/token-service');
const { getRes } = require('../service/getResponse');

module.exports = async function (req, res, next) {
    try {
        const idUser = req.params
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(403).json(getRes(31, { message: 'Token not found' }));
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const user = await User.findById({_id: idUser.id})
        if (user.email !== userData.email) {
            return res.status(403).json(getRes(32, { message: 'You are not a given user' }))
        } else {
            req.user = user 
        }
        next()
    } catch (err) {
        return res.status(403).json(getRes(100, { error: err.message }))
    }
}