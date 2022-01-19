
const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, reset, change, logout, refresh, getUsers, getUser } = require('../../controllers/auth.controller');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = Router();
const {MIN_LENGTH_PASSWORD} = require('../../config').VALIDATE;

// /api/auth/register
router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', `Минимальная длинна пароля ${MIN_LENGTH_PASSWORD} символов`)
            .isLength({min: MIN_LENGTH_PASSWORD})
    ], register)
// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], login)
// /api/auth/reset
router.post('/reset',
    [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    ], reset)
// /api/auth/change
router.post('/change',
    [
        check('password', 'Enter new password').exists()
    ], change)
// /api/auth/logout
router.post('/logout', logout)
// /api/auth/refresh
router.get('/refresh', refresh)
// /api/auth/users
router.get('/users', authMiddleware, getUsers)

// api/auth/user
router.get('/user', authMiddleware, getUser);
module.exports = router;