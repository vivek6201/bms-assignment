const { Router } = require("express");

const router = Router();
const {
  getAllBooks,
  getBookById,
  updateBook,
  createBook,
  deleteBook,
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;