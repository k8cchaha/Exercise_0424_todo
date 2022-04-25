const http = require("http");
const { v4: uuidv4 } = require("uuid");
const headers = require("./corsHeader");
const errorHandle = require("./errorHandler");

const todos = [];

const requestListener = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        message: "Hello Node",
      })
    );
    res.end();
  } else if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          todos.push({
            title: title,
            id: uuidv4(),
          });
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res, "錯誤的參數");
        }
      } catch (err) {
        errorHandle(res, "有錯誤發生");
      }
    });
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    const idx = todos.findIndex((ele) => {
      return ele.id == id;
    });
    if (idx !== -1) {
      todos.splice(idx, 1);
    } else {
      errorHandle(res, "錯誤的參數");
    }
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const id = req.url.split("/").pop();
        const todo = JSON.parse(body).title;
        const idx = todos.findIndex((ele) => {
          return ele.id == id;
        });
        console.log("id", id);
        console.log("todo", todo);
        console.log("idx", idx);
        if (idx !== -1 && todo !== undefined) {
          todos[idx].title = todo;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res, "錯誤的參數");
        }
      } catch (err) {
        errorHandle(res, "有錯誤發生");
      }
    });
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3008);
