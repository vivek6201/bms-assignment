const { Router } = require("express");

const router = Router();
const {
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;