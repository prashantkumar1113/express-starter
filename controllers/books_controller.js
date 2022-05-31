const express = require("express");
const router = express.Router();

//LIST ONE
router.get("/info/:id", (req, res) => {
    console.log("books info id");
    // res.send(`In books/info/${req.params.id}`);
    res.json({name: "Hello", author: "Prashant"});
});

// LIST ALL
router.get("/", (req, res) => {
    console.log("books root");
    res.send("In books/");
});

// CREATE ONE
router.post("/", (req, res) => {
    console.log("books root post");
    res.send("In books/ (create)");
});

// DELETE ONE
router.delete("/delete/:id", (req, res) => {
    console.log("books delete");
    res.send(`In books/delete/${req.params.id}`);
});

// UUPDATE ONE
router.patch("/update/:id", (req, res) => {
    console.log("books update");
    res.send(`In books/update/${req.params.id}`);
});

module.exports = router;
