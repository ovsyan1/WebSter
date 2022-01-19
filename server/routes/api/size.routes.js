const { Router } = require('express');
const { createSize, getSize, getAllSizes, updateSize, deleteSize } = require('../../controllers/size.contolller');

const router = Router();

// /api/size/createSize
router.post('/', createSize);
// /api/size/getSize
router.get('/:id', getSize);
// /api/size/getAllSizes
router.get('/', getAllSizes);
// /api/size/updateSize
router.put('/:id', updateSize);
// /api/size/deleteSize
router.delete('/:id', deleteSize);


module.exports = router