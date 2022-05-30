require("dotenv");
const express = require("express");
const res = require("express/lib/response");
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("root url");
    res.send("Hello Word!");
});

app.listen(3000, () => {
    console.log("listening on 3000");
});
