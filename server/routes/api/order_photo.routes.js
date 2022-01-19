const { Router } = require('express');
const { createOrderPhoto, getOrderPhoto, getAllOrderPhotos, updateOrderPhoto, deleteOrderPhoto } = require('../../controllers/order.photo.controller');

const router = Router();

// /api/order_photo/createOrderPhoto
router.post('/', createOrderPhoto);
// /api/order_photo/getOrderPhoto
router.get('/:id', getOrderPhoto);
// /api/order_photo/getAllOrderPhotos
router.get('/', getAllOrderPhotos);
// /api/order_photo/updateOrderPhoto
router.put('/:id', updateOrderPhoto);
// /api/order_photo/deleteOrderPhoto
router.delete('/:id', deleteOrderPhoto);

module.exports = router