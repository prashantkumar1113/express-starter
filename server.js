require("dotenv");
const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    console.log("root url");
    res.send("Hello Word!");
});

// LISTEN
app.listen(3000, () => {
    console.log("listening on 3000");
});
