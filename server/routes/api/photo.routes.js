const { Router } = require('express');
const {createPhoto, getPhoto, getAllPhotos, updatePhoto, deletePhoto, uploadPhoto} = require('../../controllers/photo.controller')

const router = Router();

// /api/photo/
router.post('/', createPhoto);
// /api/photo/
router.get('/:id', getPhoto);
// /api/photo/
router.get('/', getAllPhotos);
// /api/photo/
router.put('/:id', updatePhoto);
// /api/photo/
router.delete('/:id', deletePhoto);


module.exports = router