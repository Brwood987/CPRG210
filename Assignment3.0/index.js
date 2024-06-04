const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const greetings = ["morning", "afternoon", "evening", "night"];
const port = 8000;

// Set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//connect to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "travelexperts"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});


app.listen(port, () => {
    console.log("Server is listening on port " + port + ". Ready to accept requests.");
});

// Default page
app.get("/index", (req, res) => {
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

// Create the userdata table if it does not exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS userdata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(50),
        nationality VARCHAR(50),
        payment_type VARCHAR(50),
        travel_date DATETIME,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        address VARCHAR(100),
        city VARCHAR(50),
        province VARCHAR(50),
        postal_code VARCHAR(10),
        food_preferences TEXT
    );
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating the userdata table:', err);
        return;
    }
    console.log('userdata table ensured.');
});

// registration page
app.get("/register", (req, res) => {
    res.render("register", { title: "register" });
});

// Handle form submission
app.post('/submit_registration', (req, res) => {
    const { username, password, countries, payment, traveldate, fName, lName, address, city, province, postalCode, food } = req.body;
    const foodPreferences = Array.isArray(food) ? food.join(', ') : food;

    const insertQuery = `INSERT INTO userdata (username, password, nationality, payment_type, travel_date, first_name, last_name, address, city, province, postal_code, food_preferences)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [username, password, countries, payment, traveldate, fName, lName, address, city, province, postalCode, foodPreferences];

    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('An error occurred while processing your request.');
        } else {
            res.send('Registration successful! Thank you.');
        }
    });
});

// User data page
app.get("/userData", (req, res) => {
    const query = `SELECT * FROM agents`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching agent data:', err);
            res.status(500).send('An error occurred while fetching agent data.');
            return;
        }
        res.render("userData", { title: "Agent data", results });
    });
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