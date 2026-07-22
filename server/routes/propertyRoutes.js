const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  bookProperty,
} = require('../controllers/propertyController');

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.patch('/:id/book', bookProperty);

module.exports = router;
