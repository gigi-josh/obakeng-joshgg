const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  
  // Handle root path
  let filePath = req.url === '/' ? 'index.html' : req.url.substring(1);
  
  // Security: prevent directory traversal
  filePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
  
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
  };
  
  const contentType = types[ext] || 'text/plain';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err.message);
      
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        // Other server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 - Server Error: ${err.message}`);
      }
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is currently working!`);
  console.log(`Stranger website is online`);
  console.log(`Server running on port ${port}`);
});