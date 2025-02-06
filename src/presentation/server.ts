import express from "express";
import path from "path";
interface Options {
  port: number;
  publicPath: string;
}
export class Server {
  private app = express();
  private port: number;
  private publicPath: string;
  constructor({ port, publicPath }: Options) {
    this.port = port;
    this.publicPath = publicPath;
  }
  async start() {
    // * Middlewares
    // * Public folder
    this.app.use(express.static(this.publicPath));
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
    this.app.listen(this.port, () => {
      console.log("Server running on PORT 3000");
    });
  }
}
