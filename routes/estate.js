const {
    getEstate,
    createEstate,
    updateEstate,
    deleteEstate,
    getEstateBySearch,
} = require('../controllers/estate.js');

const router = require('express').Router();

router.get('/', getEstate);
router.get('/search', getEstateBySearch);
router.post('/', createEstate);
router.patch('/:id', updateEstate);
router.delete('/:id', deleteEstate);

module.exports = router;
