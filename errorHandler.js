const headers = require("./corsHeader");

function errorHandle(res, msg) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message: msg,
    })
  );
  res.end();
}

module.exports = errorHandle;
