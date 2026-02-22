const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
 let filePath = req.url === '/' ? 'index.html' : req.url.substring(1);
const ext = path.extname(filePath);
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
}
const file type = types[ext] || 'text/plain';
fs.readFile(filePath, (err, data) => {
  if (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.end("500- Server error");
    return;
  } else {
    res.writeHead(200, {'Content-Type': filePath})
    res.end(data);
  }
 })
});
server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Server is currently working!");
  console.log("Stranger website is online");
  console.log("Server running on port 3000");
});