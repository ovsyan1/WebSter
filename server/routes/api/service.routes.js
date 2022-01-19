const { Router } = require('express');
const { createService, getService, getAllService, updateService, deleteService } = require('../../controllers/service.controller');
const serviceMiddleware = require('../../middlewares/service-middleware');
const middlewareUpdateAndDelete = require('../../middlewares/service-update-delete');

const router = Router();

// /api/organize/createdOrganization
router.post('/', serviceMiddleware, createService);
// /api/organize/getOneOrganization
router.get('/:id', getService);
// /api/organize/getAllOrganization
router.get('/', getAllService);
// /api/organize/updateOrganization
router.put('/:id', middlewareUpdateAndDelete, updateService);
// /api/organize/deleteOrganization
router.delete('/:id', middlewareUpdateAndDelete, deleteService);


module.exports = router;