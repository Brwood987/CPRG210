
//Load HTTP module
const http = require("http");

//Load FS module
const fs = require("fs");

//Create the http server
http.createServer((request, response) =>{

    fs.readFile("demo.html", (err, data) => {
        //set the response HTTP header with http status and content
        response.writeHead(200, { "Content-Type": "text/html"});

        //send the response body "Hello World"
        response.write(data);
        response.end();
    })
    
    //pass a function as the 2nd argument to listen() so that we log a
    //message to the console when the server is running
}).listen(8000, () => {
    console.log("server running on port 8000");
});