import Users from './users';

class Routes {
    constructor(app) {
        this.app = app;
        this.defineRoutes();
    }
    defineRoutes() {
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });
        this.app.use('/users', new Users());
        this.app.use('/', (req, res) => {
            res.send(`<h4>App is running</h4>`);
        });
    }
};

export default Routes;