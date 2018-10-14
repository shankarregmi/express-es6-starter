import { Router } from 'express';

class UserRoutes extends Router  {
    constructor() {
        super();
        this.get('/', (req, res, next) => {
            res.json({
                status: true,
                data: [{
                    _id: 1,
                    username: 'shankar',
                    email: 'shankarregmi@gmail.com'
                }]
            });
        })
    }
};

export default UserRoutes;