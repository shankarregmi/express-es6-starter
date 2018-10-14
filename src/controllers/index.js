'use strict';
import fs from 'fs';
import path from 'path';

class Controllers {
    constructor(app) {
        this.app = app;
    }
    init() {
        const controllers = {};
        fs.readdirSync(__dirname)
            .filter(dir => {
                if (fs.statSync(path.join(__dirname, dir)).isDirectory()) {
                    const Klass =require(path.join(__dirname, dir, 'index.js'));
                    controllers[dir] = new Klass.default();
                }
            });
        this.app.controllers = controllers;
    }
};

export default Controllers;