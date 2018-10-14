import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Config from '../config';
import Routes from './routes';
import Models from './models';


class Main {
  constructor() {
    this.PORT = process.env.PORT || 3030;
    this.app = express();
    this.config = new Config().default;
  }
  async init() {
    await this.initMiddleware();
    await this.initRoutes();
    await this.initDb();
    
    this.app.listen(this.PORT, () => {
      console.log(`App running on port ${this.PORT}`);
    });
  }

  async initMiddleware() {
    // define middlewares, orders do matters
    [
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json()
    ].forEach(middleware => this.app.use(middleware));

  }
  async initRoutes() {
    new Routes(this.app);
  }

  async initDb() {
    const models = new Models();
    await mongoose.connect(this.config.db, {
      useNewUrlParser: true,
    });
    models.init();
  }
};

// bootstrap main 
const App = new Main();
App.init();