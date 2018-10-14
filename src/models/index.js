'use strict';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

class Models {
    constructor() {
        this.models = {};
    }
    get db() {
        return this.models;
    }
    init() {
        fs.readdirSync(__dirname)
            .filter(file => (file.indexOf('.') !== 0) && (file !== __filename) && (file.slice(-3) === '.js'))
            .forEach(file => {
                require(path.join(__dirname, file));
            });

        Object.keys(mongoose.models).forEach((modelName) => {
            this.models[modelName] = mongoose.model(modelName)
        })
    }
};

export default Models;