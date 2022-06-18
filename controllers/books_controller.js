const express = require("express");
const router = express.Router();
const booksDummy = require("../db");
const BooksModel = require("../models/books");
const fetch = require("node-fetch");
// Seed data

router.get("/seed", (req, res) => {
    BooksModel.insertMany(booksDummy).then(res.redirect("/books"));
});

// LIST ONE
router.get("/info/:id", async (req, res) => {
    console.log("books info id");
    //let book = db.filter((book) => book.id == req.params.id);
    try {
        let book = await BooksModel.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: "Book not found" });
    }
});
// LIST ALL
router.get("/", async (req, res) => {
    console.log("books list");
    try {
        let books = await BooksModel.find({});
        res.status(200).json(books);
    } catch (err) {
        res.status(404).json({ message: "Books not found" });
    }
});
// CREATE ONE
router.post("/", (req, res) => {
    console.log("books root post", req.body);
    const book = req.body;
    BooksModel.create(book);

    res.sendStatus(200).json({ message: "entry successfully added to the db" });
});

//Insert from API
router.post("/insert", async (req, res) => {
    console.log("books insert from api");
    const query = req.body.searchTerm;
    console.log(query);
    const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" + query
    );
    const data = await response.json();
    const book_id = data.items[0].id;
    const book_title = data.items[0].volumeInfo.title;
    const book_author = data.items[0].volumeInfo.authors[0];
    const book_isbn =
        data.items[0].volumeInfo.industryIdentifiers[0].identifier;
    const book_image = data.items[0].volumeInfo.imageLinks.thumbnail;
    const book_description = data.items[0].volumeInfo.description;
    const book = {
        id: book_id,
        name: book_title,
        author: book_author,
        isbn: book_isbn,
        image: book_image,
        description: book_description,
    };
    BooksModel.create(book);
});

// DELETE ONE
router.delete("/:id", (req, res) => {
    console.log("books delete");
    // db.splice(req.params.id - 1, req.params.id);
    try {
        BooksModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        res.status(404).json({ message: "Book not found" });
    }

    // res.json(db);
});
//DELETE ALL
router.delete("/all", (req, res) => {
    console.log("books delete all");
    try {
        BooksModel.deleteMany({});
        res.status(200).json({ message: "Books deleted" });
    } catch (err) {
        res.status(404).json({ message: "Books not found" });
    }
});

// UPDATE ONE
router.put("/update/:id", (req, res) => {
    console.log("books update", req.body);
    try {
        BooksModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Book updated" });
    } catch (err) {
        res.status(404).json({ message: "Book not found" });
    }
});

// BooksModel.find({ id: req.params.id }, (err, book) => {
//   if (err) {
//     console.log(err);
//   } else {
//     book = req.body;
//     BooksModel.updateOne({ id: req.params.id }, book, (err, book) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(book);
//       }
//     });
//   }

// BooksModel.findOneAndUpdate({ id: req.params.id }, req.body, (err, book) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         res.json(book);
//     }
// }
// );

module.exports = router;
