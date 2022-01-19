const { Router } = require('express');
const { createPrice, getPrice, getAllPrices, updatePrice, deletePrice } = require('../../controllers/price.contoller');

const router = Router();

// /api/price/createPrice
router.post('/', createPrice);
// /api/price/getPrice
router.get('/:id', getPrice);
// /api/price/getAllPrices
router.get('/', getAllPrices);
// /api/price/updatePrice
router.put('/:id', updatePrice);
// /api/price/deletePrice
router.delete('/:id', deletePrice);

module.exports = router