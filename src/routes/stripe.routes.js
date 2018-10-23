import { Router } from 'express';

class StripeRoutes extends Router  {
    constructor(app) {
        super();
        const { Stripe } = app.controllers;
        
        this.get('/', Stripe.get);
        this.post('/', Stripe.create);
        this.post('/charge', Stripe.charge);
        this.post('/webhook', Stripe.webhook);
    }
};

export default StripeRoutes;