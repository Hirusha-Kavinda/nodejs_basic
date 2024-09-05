// const http = require('http');

// function rqListener(req, res){

// }

// http.createServer(rqListener);


// const http = require('http');
// http.createServer(function(req, res){
    
// })


const http = require('http');
const fs = require('fs');
const { log } = require('console');



const server = http.createServer((req, res) => {

     const url = req.url;
     const method = req.method;
     if(url === '/'){
          res.setHeader('Content-Type', 'text/html');
          res.write('<html>')
          res.write('<head><title> test </title></head>')
          res.write('<body><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">click</button></form></body>')
          res.write('</html>') 
          return res.end();
     }

    // console.log(req.url , req.method, req.headers);
     //process.exit();

     if (url === '/message' && method === 'POST') {
          const body = [];
          req.on('data', (chunk) => {
               console.log(chunk)
               body.push(chunk);
              // console.log(body);
          });

          req.on('end' , () =>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
           // console.log(" massage eka pako :"+ message);
            fs.writeFileSync('message.txt', message);

          })

         
          res.statusCode = 302;
          res.setHeader('Location' , '/')
          return res.end();
     }
  
     res.setHeader('Content-Type', 'text/html');
     res.write('<html>')
     res.write('<head><title> test </title></head>')
     res.write('<body><h1> nodejs server is running </h1></body>')
     res.write('</html>') 
     res.end();

})

server.listen(8080);