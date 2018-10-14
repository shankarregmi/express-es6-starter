import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Config from '../config';
import Controllers from './controllers';
import Models from './models';
import Routes from './routes';
import Utils from './utils';

class Main {
  constructor() {
    this.PORT = process.env.PORT || 3030;
    this.app = express();
    this.config = new Config().default;
  }
  async init() {
    await this.initUtils();
    await this.initMiddleware();
    await this.initDb();
    await this.initControllers();
    await this.initRoutes();

    this.app.listen(this.PORT, () => {
      console.log(`App running on port ${this.PORT}`);
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