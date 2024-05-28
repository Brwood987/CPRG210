const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

app.listen(port, () => {
    console.log("Server is listening on port " + port + ". Ready to accept requests.");
});

//default page
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//about page
app.get("/about", (req, res) => {
    res.sendFile(`${__dirname}/pages/about.html`);
});

//contact page
app.get("/contact", (req, res) => {
    res.sendFile(`${__dirname}/pages/contact.html`);
});

//home page
app.get("/home", (req, res) => {
    res.sendFile(`${__dirname}/pages/home.html`);
});

//pick from 4 greeting files
app.get("/greet", (req, res) => {
    var file = greetings[Math.floor(Math.random() * greetings.length)] + ".html";
    res.sendFile(`${__dirname}/greetings/${file}`);
});

app.use(checkNotFound);

function checkNotFound(req, res, next){
    res.status(404).send("File Not Found");
}
