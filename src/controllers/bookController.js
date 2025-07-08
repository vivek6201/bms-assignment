const Book = require("../modals/Book");
const bookValidation = require("../validations/book");

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getBookById: async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createBook: async (req, res) => {
    const body = req.body;

    const { success, data, error } = bookValidation.safeParse(body);

    if (!success || !data) {
      res.status(401).json({
        error: error.issues.map((issue) => {
          return {
            message: issue.message,
            path: issue.path[0],
          };
        }),
      });
    }

    try {
      const newBook = new Book({
        name: data.name,
        author: data.author,
        publisher: data.publisher,
        shortDescription: data.shortDescription,
        publishedDate: Date.now(),
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateBook: async (req, res) => {
    const body = req.body;
    const bookId = req.params.id;

    const { success, data, error } = bookValidation.partial().safeParse(body);

    if (!success || !data) {
      res.status(401).json({
        error: error.issues.map((issue) => {
          return {
            message: issue.message,
            path: issue.path[0],
          };
        }),
      });
    }

    try {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
          name: data.name,
          author: data.author,
          shortDescription: data.shortDescription,
          publishedDate: data.publishedDate,
          publisher: data.publisher,
        },
        { new: true }
      );

      if (!updatedBook)
        return res.status(404).json({ message: "Book not found" });
      res.json(updatedBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteBook: async (req, res) => {
    const bookId = req.params.id;
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook)
        return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
