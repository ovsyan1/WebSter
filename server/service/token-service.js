const jwt = require('jsonwebtoken');
const TokenModel = require('../models/Token')
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_RESET_SECRET} = require('../config')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '90m' })
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }
    generateTokenResetPassword(payload) {
        const resetToken = jwt.sign(payload, JWT_RESET_SECRET)
        return resetToken
    }

    validateTokenReset(payload) {
    try {
        const resetToken = jwt.verify(payload, JWT_RESET_SECRET)
        return resetToken   
    } catch (err) {
        return null
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET)
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET)
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken })
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData;
    }
}

module.exports = new TokenService();