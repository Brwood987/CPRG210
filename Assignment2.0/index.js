const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const port = 8000;
const greetings = ["morning", "afternoon", "evening", "night"];

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "travelexperts"
}, () => {
	//if (err) throw err;
	console.log("Connected to DB!");
});
con.on('error', function (connection) {
	console.log("Failure!");
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	//var user = "Robert'; DROP TABLE packages_products_suppliers;SELECT * FROM customers WHERE custfirstname LIKE 'A%";
	//var user = "Monica";
	var sql = "SELECT * FROM customers WHERE custprov=? AND custcity=? AND custcountry=?";
	console.log("SQL: "+sql);
	//con.query(sql, ['AB', 'Edmonton', 'Canada'], function (err, result) {
	var queryPayload = {"sql": sql, "values": ['AB', 'Edmonton', 'Canada']};
	con.query(queryPayload, function (err, result) {
		if (err) throw err;
		console.log("Result: " + JSON.stringify(result));
		result.forEach((row) => {
			console.log("Row: " + JSON.stringify(row));
		});
		con.end(function(err) {
			if (err) throw err;
		});
	});
	
	var sql = "SELECT customers.CustFirstName, customers.CustLastName, bookings.BookingNo FROM customers JOIN bookings ON customers.CustomerId = bookings.CustomerId";
	con.query(sql, function(err, result) {
		if (err) throw err;
		console.log(result);
		con.end(function(err) {
			if (err) throw err;
		});
	});
});

// Don't query here, we're not connected yet!

app.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

//app.set("views", path.join(__dirname, "views"));
app.set("views", "views");
app.set("view engine", "pug");

// Process POST vars
app.use(express.urlencoded({ extended: true }));

// ROOT ROUTE
//app.get("/", (req, res) => {
//	res.send("Hello World!");
//});
app.get("/login", (req, res) => {
	res.send("<form method='POST'><input type='text' name='username' /><input type='submit' /></form>");
});
app.post("/login", (req, res) => {
	res.send("<h1>Login Processed</h1>");
});

app.post("/create-post", (req, res) => {
	console.log(req.body);
	res.redirect("/thank-you");
});

app.get("/thank-you", (req, res) => {
	res.end("Thank you for your post!");
});

app.get("/greet", (req, res) => {
	var file = greetings[Math.floor(Math.random() * greetings.length)] + ".html";
	res.sendFile(`${__dirname}/greetings/${file}`);
});
/*app.get("/about", (req, res) => {
	res.send("This is a company.");
});
app.get("/contact", (req, res) => {
	res.send("403-555-1234");
});*/

app.get("/", (req, res) => {
	//res.render("index", { greeting: "Hello there!" });
	res.render("index", { pagetitle: "Foobar", username: "Linden", greetings: ["Hello", "Bonjour", "Hola", "Ciao"] });
});
app.get("/about", (req, res) => {
	res.render("about");
});
app.get("/contact", (req, res) => {
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "SELECT * FROM agents LIMIT 4";
		con.query(sql, function(err, result) {
			if (err) throw err;
			console.log(result);
			var agents = [];
			result.forEach((agent) => {
				agents.push(JSON.stringify(agent));
				agents.push(agent);
				console.log(agent);
			});
			res.render("contact", {agents});
			con.end(function(err) {
				if (err) throw err;
			result.forEach((agent) => {
				console.log(agent.keys());
			});
			result.forEach((agent) => {
				res.render("contactcard", {agent});
			});
			res.render("contact", {agents: result});
			});
		});
	});
});
app.get("/create-post", (req, res) => {
	res.render("create-post");
});
app.get("/test", (req, res) => {
	res.render("test");
});
app.get("/subtest", (req, res) => {
	res.render("subtest");
});


app.use(express.static("views", {
	extensions: ["html"]
}));
app.use(express.static("public"));
app.use('/img', express.static("image_assets"));
app.use('/snd', express.static("audio_assets"));
/*app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!");
});*/
app.use(checkNotFound);
function checkNotFound(req, res, next) {
	//res.status(404).send("File Not Found!");
	res.status(404).render("error404");
}

// Change












