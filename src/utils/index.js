import fs from 'fs';
import path from 'path';
class Utils {
    constructor(app){
        this.app = app;
    }
    init() {
        const utils = {};
        fs.readdirSync(__dirname)
            .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
            .forEach(file => {
                utils[path.parse(file).name] = require(path.join(__dirname, file)).default;
            });
        this.app.utils = utils;
    }
}

export default Utils;