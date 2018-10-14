import { Router } from 'express';

class UserRoutes extends Router  {
    constructor(app) {
        super();
        const {users} = app.controllers;
        this.get('/', users.find);
        this.post('/', users.create);
    }
};

export default UserRoutes;