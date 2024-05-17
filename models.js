const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;
