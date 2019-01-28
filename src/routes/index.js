import requireDirectory from 'require-directory';

class Routes {
    constructor(app) {
        this.app = app;
    }
    init = () => {
        const { app } = this.app; // express app `this.app.app`
        const routes = requireDirectory(module, {
            include: /.routes.js$/,
            visit: value => value.default,
            rename: name => name.replace('.routes', '')
        });
        for (const route in routes) {
            app.use(`/${route}`, new routes[route](this.app));
        }
        app.use('*', (req, res) => {
          res.sendFile('index.html', {'root': `${__dirname}/../../public`});
        });
    }
};

export default Routes;
