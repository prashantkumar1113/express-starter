const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  author: String,
  isbn: String,
  image: String,
  description: String,
});

const Books = mongoose.model("Books", bookSchema);
module.exports = Books;
