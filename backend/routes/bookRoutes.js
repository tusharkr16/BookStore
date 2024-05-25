const express = require('express');
const { uploadBooks, getAllBooks, updateBook, deleteBook, getBookById } = require('../controllers/booksControllers');

const router = express.Router();

router.route('/').post(uploadBooks);
router.route('/all-books').get(getAllBooks);
router.route('/:id').patch(updateBook).delete(deleteBook).get(getBookById);

module.exports = router;