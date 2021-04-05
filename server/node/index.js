const http = require('http');
const hostname = '127.0.0.1';   //or localhost
const PORT = 3020;
const router = require('./router');
const bodyParser = require('./bodyParser');


const server = http.createServer(function (req, res) {
  bodyParser(req, res, router);
});
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

server.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});


