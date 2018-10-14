import dev from './dev';

class Config {
    constructor(env = 'dev') {
        this.env = env;
    }
    get default() {
        return this[this.env]();
    }
    dev() {
        return dev;
    }
};
export default Config;
