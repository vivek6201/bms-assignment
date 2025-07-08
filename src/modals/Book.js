const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
