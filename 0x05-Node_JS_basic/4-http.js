const {createServer} = require('node:http');

const hostname = 'localhost';
const port = 1245;

const app = createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'plain/text')
  res.end('Hello ALX!');
});

app.listen(port, hostname, ()=>{
  console.log(`server listening at ${hostname}:${port}`);
});