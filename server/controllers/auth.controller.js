const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserDto = require('../dto/user-dto');
const { validationResult } = require('express-validator');
const mailer = require('../nodemailer/mailer');
const tokenService = require('../service/token-service');
const { LIVE_TIME_TOKEN } = require('../config');
const { getRes } = require('../service/getResponse');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()) {
            return res.status(200).json(getRes(10, {
                error: errors.array(),
                message: 'Incorrect data on registration'
            }));
        }
        const { email, password, confirm, name } = req.body
        const candidate = await User.findOne({ email })
            if(candidate) {
                return res.status(200).json(getRes(20, { message: 'Such a user already exists' }));
            } else {
                if (password !== confirm) {
                    return res.status(200).json(getRes(21, { message: 'Password does not coincide with confirm' }))
                } else {
                    const hashPassword = await bcrypt.hash(password, 13)
                    const user = new User({ email, password: hashPassword, name });
                    await user.save();
                    const userDto = new UserDto(user) // используем как payload
                    const tokens = tokenService.generateTokens({ ...userDto })
                    if (!tokens) {
                        return res.status(400).json(getRes(30, { message: 'Tokens not generated' }))
                    }
                    await tokenService.saveToken(userDto.id, tokens.refreshToken)
                    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, domain: '.printapp.store'})
                    return res.status(201).json(getRes(0, {data: { ...tokens, user: userDto }, message: 'The user has been successfully registered'}))
                }
            }
    } catch (err) {
       return res.status(500).json(getRes(500, {message: 'Error. The server cannot process your request.'}));
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })
        if (!candidate) {
            return res.status(200).json(getRes(2, { message: 'User not found, please register' }))
        }
        const checkPassword = await bcrypt.compare(password, candidate.password)
        if (!checkPassword) {
            return res.status(200).json(getRes(3, { message: 'Authorization error, check your username and password.' }))
        } else {
            const userDto = new UserDto(candidate)
            const tokens = tokenService.generateTokens({ ...userDto })
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, domain: '.printapp.store'})
            return res.status(200).json(getRes(0, {data: { ...tokens, user: userDto }}))
        }
    } catch (err) {
        return res.status(500).json(getRes(100, { error: err.message }))
    }
}

exports.reset = async (req, res) => {;
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const userDto = new UserDto(user)
            const token = tokenService.generateTokenResetPassword({ ...userDto })
            if (!token) {
                return res.status(200).json(getRes(30, { message: 'Token not generated' }))
            } else {
                user.resetToken = token
                user.resetTokenExp = Date.now() + LIVE_TIME_TOKEN
                await user.save()
                res.status(200).json(getRes(0, { message: 'Message was sent successfully' }))
                return mailer(userDto.email, token)
            }
         } else {
            return res.status(200).json(getRes(2, { message: "User wasn't found, please register" }))
         }
    } catch (err) {
        return res.status(500).json(getRes(100, {error: err.message}))
     }
}

exports.change = async (req, res) => {
    try {
        const { resetToken, password } = req.body
        const resetT = req.body.resetToken
        if (resetToken) {
            const token = tokenService.validateTokenReset(resetToken)
            const user = await User.findOne({ email: token.email, resetToken: resetT, resetTokenExp: { $gt: Date.now() }})
            if (!user) {
                return res.status(200).json(getRes(1, { message: 'Token expired' }))
            } else {
                const checkPassword = await bcrypt.compare(password, user.password)
                    if (checkPassword) {
                        res.status(200).json(getRes(23, { message: 'Пароль совпадает со старым'}))
                    } else {
                        const hashPassword = await bcrypt.hash(password, 13)
                        user.password = hashPassword
                        user.resetToken = ''
                        user.resetTokenExp = ''
                        await user.save()
                        return res.status(201).json(getRes(0, {message: 'Password successfully changed'}));
                    } 
              } 
        } else {
            return res.status(200).json(getRes(30, {message: 'Token not generated'}))
        }
    } catch (err) {
        return res.status(500).json(getRes(100, {error: err.message}))
    }
}

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        const token = await tokenService.removeToken(refreshToken)
        if (!token) {
            return res.status(200).json(getRes(30, { message: 'Token not generated' }))
        }
        res.clearCookie('refreshToken')
        return res.status(200).json(getRes(0, { data: token }))
    } catch (err) {
        return res.status(500).json(getRes(100, {error: err.message}))
    }
}

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        // console.log(req.cookies);
        if (!refreshToken) {
            return res.status(200).json(getRes(31, { message: 'Token not found' }));
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            return res.status(200).json(getRes(1, { message: 'User not authorization' }))
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, domain: '.printapp.store'})
        return res.status(200).json(getRes(0, { data: { ...tokens, user: userDto } }))
    } catch (err) {
        return res.status(500).json(getRes(100, {error: err.message}))
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(200).json(getRes(4, { message: 'Users not found' }))
        }
        return res.status(200).json(getRes(0,{data: users}))
    } catch (err) {
        return res.status(500).json(getRes(100, { error: err.message }))
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json(getRes(0, { data: { email: user.email, id: user.id, name: user.name, isAdmin: user.isAdmin }}));
    } catch (err) {
        return res.status(500).json(getRes(100,{error: err.message}))
    }
}