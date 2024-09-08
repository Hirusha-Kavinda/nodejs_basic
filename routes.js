const fs = require("fs");



const requestHandler =(req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title> test </title></head>");
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">click</button></form></body>'
        );
        res.write("</html>");
        return res.end();
      }
    
    
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
         console.log(chunk);
          body.push(chunk);
          console.log(body);
        });
    
        return req.on("end", () => {
          const parseBody = Buffer.concat(body).toString();
          const message = parseBody.split("=")[1];
          // console.log(" massage eka pako :"+ message);
          fs.writeFile("message.text", message, (err) => {
              if (err) {
                   console.error("Error writing file:", err);
                 }
         
                 // Redirect after writing the file
                 res.statusCode = 302;
                 res.setHeader("Location", "/");
                 return res.end();
          });
        });
      }
    
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title> test </title></head>");
      res.write("<body><h1> nodejs server is running </h1></body>");
      res.write("</html>");
      res.end();
}; 

/*
module.exports ={
    handler: requestHandler,
    someText: 'Some hard coded text'
} */

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';