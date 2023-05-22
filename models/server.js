const cors = require("cors");
const express = require("express");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.GAME_PATH = "";
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.GAME_PATH, require("../routes/game"));
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server Running in PORT: ${this.port}`);
    });
  }
}

module.exports = Server;
