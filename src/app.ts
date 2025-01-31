import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);
    // res.writeHead(200, {
    // "Content-Type": "text/html",
    // });

    // SSR
    // res.write(`<h1 style='background-color:#f00'>${req.url}</h1>`);
    const exp = /\.(css|js)/;
    if (req.url == "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(htmlFile);
      return;
    } else if (exp.test(req.url!)) {
      const file = fs.readFileSync(`./public${req.url}`, "utf-8");

      res.end(file);
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end();
    }

    // const data = { name: "Jonh Doe", age: 30, city: "New York" };
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });
    // res.write(JSON.stringify(data));
    // res.end();
  }
);
server.listen(3000);
