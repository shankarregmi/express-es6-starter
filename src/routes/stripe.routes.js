import { Router } from 'express';

class StripeRoutes extends Router  {
    constructor(app) {
        super();
        const { stripe } = app.controllers;
        
        // this.get('/', stripe.get);
        // this.post('/', stripe.create);
        // this.post('/webhook', stripe.webhook);
    }
};

export default StripeRoutes;