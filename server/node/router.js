const fs = require('fs');
const path = require('path');
const db = require('./db');
const clientPath = path.join(__dirname, '../../client');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

function router (req, res) {
  if (req.url === '/messages' && req.method === 'POST') {
    db.msgs.push(req.body);
    res.writeHead(201);
    res.end('Created');
  } if (req.url === '/messages' && req.method === 'GET') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(db.msgs));
  } else {
    if (req.url === '/') req.url = '/index.html';
    const extName = path.extname(req.url);
    const contentType = mimeTypes[extName];
    fs.readFile(clientPath + req.url, 'utf-8', function (err, data) {
      if (err) {
        // handle error
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, { 'Content-type': contentType });
        res.end(data);
      }
    });
  }
}

module.exports = router;