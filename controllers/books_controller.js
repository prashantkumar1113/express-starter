const express = require("express");
const router = express.Router();
const db = require("../db");

// LIST ONE
router.get("/info/:id", (req, res) => {
    console.log("books info id");
    let book = db.filter((book) => book.id == req.params.id);
    // let book = db[req.params.id];
    res.json(book);
});

// LIST ALL
router.get("/", (req, res) => {
    console.log("books root");
    res.send(db);
});

// CREATE ONE
router.post("/", (req, res) => {
    console.log("books root post");
    res.send("In books/ (create)");
});

// DELETE ONE
router.delete("/delete/:id", (req, res) => {
    console.log("books delete");
    // db.splice(req.params.id - 1, req.params.id);
    res.send(`In books/delete/${req.params.id}`);
    // res.json(db);
});

// UPDATE ONE
router.patch("/update/:id", (req, res) => {
    console.log("books update");
    res.send(`In books/update/${req.params.id}`);
});

module.exports = router;
