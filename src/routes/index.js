import Users from './users';

class Routes {
    constructor(app) {
        this.app = app;
    }
    init() {
        // unpack express app
        const { app } = this.app;
        app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });
        app.use('/users', new Users(this.app));
        app.use('/', (req, res) => {
            res.send(`<h4>App is running</h4>`);
        });
    }
};

export default Routes;