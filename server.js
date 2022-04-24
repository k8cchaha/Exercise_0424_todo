const http = require("http");

const requestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello Node");
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3008);
