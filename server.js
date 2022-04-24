const http = require("http");

const requestListener = (req, res) => {
  const header = { "Content-Type": "text/plain" };

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, header);
    res.write("Hello Node");
    res.end();
  } else if (req.url === "/" && req.method === "DELETE") {
    res.writeHead(200, header);
    res.write("Delete!");
    res.end();
  } else {
    res.writeHead(404, header);
    res.write("Not Found");
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3008);
