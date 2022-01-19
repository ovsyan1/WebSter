const { Router } = require('express');
const { createPaper, getPaper, getAll, updatePaper, deletePaper } = require('../../controllers/paper.controller');

const router = Router();

// /api/paper/createPaper
router.post('/', createPaper);
// /api/paper/getPaper
router.get('/:id', getPaper);
// /api/paper/getAll
router.get('/', getAll);
// /api/paper/updatePaper
router.put('/:id', updatePaper);
// /api/paper/deletePaper
router.delete('/:id', deletePaper);

module.exports = router