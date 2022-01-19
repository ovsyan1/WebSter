const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const { getRes } = require('../service/getResponse');

const router = Router();

router.use('/auth', require('./api/auth.routes'));
router.use('/user', authMiddleware, require('./api/user.routes'));
router.use('/service', authMiddleware, require('./api/service.routes'));
router.use('/order', authMiddleware, require('./api/order.routes'));
router.use('/order_photo', authMiddleware, require('./api/order_photo.routes'));
router.use('/paper', authMiddleware, require('./api/paper.routes'));
router.use('/photo', authMiddleware, require('./api/photo.routes'));
router.use('/price', authMiddleware, require('./api/price.routes'));
router.use('/type', authMiddleware, require('./api/type.routes'));
router.use('/size', authMiddleware, require('./api/size.routes'));
router.get('/', (req, res) => {
    res.send('home api');
});
router.get('*', (req, res) => {
    res.status(404).json(getRes(404));
});
module.exports = router;