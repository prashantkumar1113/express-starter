require("dotenv").config();
const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CONTROLLERS
app.use("/books", require("./controllers/books_controller"));

// ROUTES
app.get("/", (req, res) => {
    console.log("root url");
    res.send("Hello Word!");
});

// LISTEN
const port = process.env.PORT ? process.env.PORT : 3001;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
