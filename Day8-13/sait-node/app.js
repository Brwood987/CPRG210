
//Load HTTP module
const http = require("http");

//Load FS module
const fs = require("fs");

const url = require("url");



//Create the http server
http.createServer((request, response) =>{

    let parsedAddress = url.parse(request.url, true);
    let file = "." + parsedAddress.pathname;

    fs.readFile(file, (err, data) => {
        //set the response HTTP header with http status and content
        response.writeHead(200, { "Content-Type": "text/html"});

        //send the response body "Hello World"
        response.write(data);
        response.end();

        if (err) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<h1>404: Page Not Found<h1>");
            return response.end();
        }
    })
    
    //pass a function as the 2nd argument to listen() so that we log a
    //message to the console when the server is running
}).listen(8000, () => {
    console.log("server running on port 8000");
});