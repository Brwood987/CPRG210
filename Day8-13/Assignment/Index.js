const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

// Set the view engine to Pug
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.listen(port, () => {
    console.log("Server is listening on port " + port + ". Ready to accept requests.");
});

// Default page
app.get("/", (req, res) => {
    res.render("index", { title: "Hello World!" });
});

// About page
app.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

// Contact page
app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

// Home page
app.get("/home", (req, res) => {
    res.render("home", { title: "Home" });
});

// Pick from 4 greeting files
app.get("/greet", (req, res) => {
    var file = greetings[Math.floor(Math.random() * greetings.length)];
    res.render(`greetings/${file}`, { title: "Greeting" });
});

app.use(checkNotFound);

function checkNotFound(req, res, next) {
    res.status(404).send("File Not Found");
}