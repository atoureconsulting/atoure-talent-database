// Minimal static file server for the talent roster + admin tool.
// No framework/dependencies so `npm install` has nothing to do at deploy time.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

const ROUTES = {
  '/': 'index.html',
  '/admin': 'atoure-talent-database 01.04.2026.html',
};

function safeJoin(root, reqPath) {
  const resolved = path.normalize(path.join(root, reqPath));
  if (!resolved.startsWith(root)) return null; // block path traversal
  return resolved;
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const relPath = ROUTES[urlPath] || urlPath.replace(/^\/+/, '');
  const filePath = safeJoin(ROOT, relPath);

  if (!filePath) { res.writeHead(400); res.end('Bad request'); return; }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`AToure Talent Database serving on port ${PORT}`));
