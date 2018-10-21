import Stripe from 'stripe';

class StripeController {
    constructor(app) {
        this.app = app;
        const { secret } = this.app.config.stripe;
        this.stripe = new Stripe(secret);
    }
    get = async (req, res) => {
        res.json('stripe running.');
    }
    create = async(req, res) => {
        const { name, email } = req.body;
        // const { headers: {authorization} } = req;
        // console.log('Authorization', req.headers.authorization);
        // if (authorization) {
        //     console.log(Object.keys(this.app.sockets));
            
        //     this.app.sockets[authorization].emit('source.charged', {name, email});
        // }
        // res.json(true);
        
        
        try {
            const source = await this.stripe.sources.create({
              type: "sepa_credit_transfer",
              currency: "eur",
              owner: {
                name,
                email
              },
            });
            res.json({
                iban: source.sepa_credit_transfer.iban
            })
          } catch (error) {
            console.log(`Something bad happened, ${error.message}`);
            res.json({
                error
            });
          }
    }
    webhook = async (req, res) => {
        const { type } = req.body;
        const {data: {object}} = req.body.
        this.app.socketIO.emit(type, {data: req.body});
        if (type === 'source.chargeable') {
            console.log('do you want to charge the source');
            
            // this.stripe.customers.create({
            //     email: object.owner.email,
            //     name: 
            // })
        }
        res.status(200).json({ status: true });
        
    }
}

export default StripeController;