import requireDirectory from 'require-directory';

class Models {
    constructor(app) {
        this.app = app;
        this.app.db = {};
    }
    init = () => {
        const models = requireDirectory(module, {
            include: /.model.js$/,
            visit: value => value.default,
            rename: name => name.replace('.model', '').replace(/^\w/, c => c.toUpperCase())
        });
        for (const model in models) {
            this.app.db[model] = models[model];
        }
    }
};

export default Models;