const tokenService = require('../service/token-service');
const { getRes } = require('../service/getResponse');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        // console.log('authorizationHeader');
        if (!authorizationHeader) {
            return res.status(401).json(getRes(1, { message: 'Error authorization' }));
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json(getRes(31, { message: 'Error authorization' }));
        }
        // Аксесс токен просрочен
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json(getRes(32, { message: 'Token expired!' }))
        }
        req.user = userData;
        next();
    } catch (err) {
        return res.status(403).json(getRes(100, { error: err.message }));
    }
}