import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import mongoose from 'mongoose';

import Config from '../config';
import Controllers from './controllers';
import Models from './models';
import Routes from './routes';
import Utils from './utils';

class Main {
  constructor() {
    this.PORT = process.env.PORT || 3030;
    this.app = express();
    this.server = http.createServer(this.app);
    this.socketIO = io.listen(this.server);
    this.config = new Config().default;
    this.sockets = {};
  }
  async init() {
    await this.initUtils();
    await this.initMiddleware();
    await this.initDb();
    await this.initControllers();
    await this.initRoutes();

    this.server.listen(this.PORT, () => {
      console.log(`App running on port ${this.PORT}`);
    });
    this.socketIO.on('connection', (socket) => {
        this.sockets[socket.id] = socket;
    });
  }
  initUtils() {
    const utils = new Utils(this);
    utils.init();
  }
  async initMiddleware() {
    // define middlewares, orders do matters
    [
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json()
    ].forEach(middleware => this.app.use(middleware));

  }
  async initDb() {
    const models = new Models(this);
    await mongoose.connect(this.config.db, {
      useNewUrlParser: true,
    });
    models.init();
  }
  async initControllers() {
    const controllers = new Controllers(this);
    controllers.init();
  }
  async initRoutes() {
    const routes = new Routes(this);
    routes.init();
  }
};

// bootstrap main 
const App = new Main();
App.init();