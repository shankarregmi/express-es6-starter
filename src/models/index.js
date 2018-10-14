'use strict';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

class Models {
    constructor(app) {
        this.app = app;
    }
    init() {
        const db = {};
        fs.readdirSync(__dirname)
            .filter(file => (file.indexOf('.') !== 0) && (file !== __filename) && (file.slice(-3) === '.js'))
            .forEach(file => {
                require(path.join(__dirname, file));
            });

        Object.keys(mongoose.models).forEach((modelName) => {
            db[modelName] = mongoose.model(modelName)
        });
        this.app.db = db;
    }
};

export default Models;