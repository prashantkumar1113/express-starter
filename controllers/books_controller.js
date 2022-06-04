const express = require("express");
const router = express.Router();
const booksDummy = require("../db");
const BooksModel = require("../models/books");

// Seed data

router.get("/seed", (req, res) => {
  BooksModel.insertMany(booksDummy).then(res.redirect("/books"));
});

// LIST ONE
router.get("/info/:id", (req, res) => {
  console.log("books info id");
  //let book = db.filter((book) => book.id == req.params.id);
  BooksModel.find({ id: req.params.id }, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      res.json(book);
    }
  });
  // let book = db[req.params.id];
  //   res.json(book);
});

// LIST ALL
router.get("/", (req, res) => {
  console.log("books list");
  BooksModel.find({}, (err, books) => {
    if (err) {
      console.log(err);
    } else {
      res.json(books);
    }
  });

  //   console.log("books root");
  //   res.send(db);
});

// CREATE ONE
router.post("/", (req, res) => {
  console.log("books root post", req.body);
  const book = req.body;
  BooksModel.create(book);

  res.sendStatus(200).json({ message: "entry successfully added to the db" });
});

// DELETE ONE
router.delete("/delete/:id", (req, res) => {
  console.log("books delete");
  // db.splice(req.params.id - 1, req.params.id);
  BooksModel.deleteOne({ id: req.params.id }, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      res.json(book);
    }
  });

  // res.json(db);
});

// UPDATE ONE
router.put("/update/:id", (req, res) => {
  console.log("books update", req.body);
  BooksModel.find({ id: req.params.id }, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      book = req.body;
      BooksModel.updateOne({ id: req.params.id }, book, (err, book) => {
        if (err) {
          console.log(err);
        } else {
          res.json(book);
        }
      });
    }

    // BooksModel.findOneAndUpdate({ id: req.params.id }, req.body, (err, book) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.json(book);
    //     }
    // }
    // );
  });
});

module.exports = router;
