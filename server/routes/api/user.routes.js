const { Router } = require('express');
const { getAll, updatedData, deletedData } = require('../../controllers/user.controller');
const userMiddleware = require('../../middlewares/user-middleware');

const router = Router();



// /api/user/getAll
router.get('/', getAll);
// /api/user/:id/updatedData
router.put('/:id', userMiddleware, updatedData)
// /api/delete/:id/deletedData
router.delete('/:id', userMiddleware, deletedData)


module.exports = router;