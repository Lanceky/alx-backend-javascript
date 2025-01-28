const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

//create server
const app  = createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World'); 
})

app.listen(port, hostname, ()=> {console.log(`sever running at ${hostname}`)});