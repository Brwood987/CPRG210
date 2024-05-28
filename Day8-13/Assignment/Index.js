const express = require("express");
const app = express();
const port = 8000;

app.listen(port, () => {
    console.log("Server is listening on port ${port}. Ready to accept requests.");
});

//default page
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// login page? Have to type /login in the browser??
app.get("/login", (req, res) => {
    res.send("<form method = 'POST'><input type = 'text' name 'username' ")
})

//once user logs in, send a post message that approves the login
app.post("/login", (req, res) => {
    res.send("<h1>Login Processed</h1>");
});

//pick from 4 greeting files
app.get("/greet", (req, res) => {
    var file = greetings[Math.floor(Math.random() * greetings.length)] + ".html";
    res.sendFile('$(_dirname)/greetings/$(file)');
});

//check to see if adding .html to the path solves things. 
//Makes it so you can just type the file name instead of the name +.html
app.use(express.static("views", {
    extensions: ["html"]
}));

//allows express to access the public folder
app.use(express.static("public"));


app.use(checkNotFound);

function checkNotFound(req, res, next){
    res.status(404).send("File Not Found");
}


//app.use((req, res, next) => {
  //  res.status(404).send("Sorry I can't find that!");
//});