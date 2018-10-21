import { Router } from 'express';

class UserRoutes extends Router  {
    constructor(app) {
        super();
        const { Users } = app.controllers;
        this.get('/', Users.find);
        this.post('/', Users.create);
    }
};

export default UserRoutes;