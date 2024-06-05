let http = require("http");
let url = require("url");
let fs = require("fs");

let server = http.createServer((req, res) => {
  let reqUrl = url.parse(req.url, true);
  console.log(reqUrl.pathname);

  let filePath = "";
  switch (reqUrl.pathname) {
    case "/":
      filePath = "./index.html";
      break;
    case "/about":
      filePath = "./about.html";
      break;
    case "/contact":
      filePath = "./contact-me.html";
      break;
    default:
      filePath = "./404.html";
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("File not found");
      return res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  });
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
