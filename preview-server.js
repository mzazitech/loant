const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 3000;

const routeHashes = {
  "/": "",
  "/sign-up": "#account",
  "/sign-in": "#account",
  "/onboarding": "#account",
  "/membership": "#membership",
  "/apply": "#apply",
  "/repayments": "#repayments"
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function sendFile(response, filePath) {
  const extension = path.extname(filePath);
  const contentType = mimeTypes[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (Object.prototype.hasOwnProperty.call(routeHashes, url.pathname)) {
    if (routeHashes[url.pathname]) {
      response.writeHead(302, { Location: `/${routeHashes[url.pathname]}` });
      response.end();
      return;
    }

    sendFile(response, path.join(root, "index.html"));
    return;
  }

  const requestedPath = path.normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, requestedPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  sendFile(response, filePath);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Zeneka Loan preview running at http://127.0.0.1:${port}`);
});
