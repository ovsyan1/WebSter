const { Router } = require('express');
const { createType, getType, getAllTypes, updateType, deleteType } = require('../../controllers/type.controller');

const router = Router();

// /api/type/createType
router.post('/', createType);
// /api/type/getType
router.get('/:id', getType);
// /api/type/getAllTypes
router.get('/', getAllTypes);
// /api/type/updateType
router.put('/:id', updateType);
// /api/type/deleteType
router.delete('/:id', deleteType);

module.exports = router