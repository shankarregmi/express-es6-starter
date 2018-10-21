import requireDirectory from 'require-directory';

class Controllers {
    constructor(app) {
        this.app = app;
        this.app.controllers = {};
    }
    init = () => {
        const controllers = requireDirectory(module, {
            include: /.controller.js$/,
            visit: value => value.default,
            rename: name => name.replace(/^\w/, c => c.toUpperCase())
        });
        for (const ctl in controllers) {
            this.app.controllers[ctl] = new controllers[ctl][`${ctl}.controller`](this.app);
        }
    }
};

export default Controllers;