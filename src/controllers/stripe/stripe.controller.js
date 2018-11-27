import Stripe from 'stripe';
import get from 'lodash/get';

class StripeController {
    constructor(app) {
        this.app = app;
        const { secret } = this.app.config.stripe;
        this.stripe = new Stripe(secret);
    }
    get = async (req, res) => {
        const customer = {};
        res.json(customer);
    }
    create = async (req, res) => {
        const { name, email } = req.body;
        const { headers: { authorization } } = req;
        if (authorization && name && email) {
            try {
                const source = await this.stripe.sources.create({
                    type: "sepa_credit_transfer",
                    currency: "eur",
                    owner: {
                        name,
                        email
                    },
                    metadata: {
                        authorization
                    }
                });
                const customer = await this.stripe.customers.create({
                    source: source.id,
                    description: name,
                    email,
                    metadata: {
                        authorization
                    }
                });
                const iban = get(source, 'sepa_credit_transfer.iban');
                res.json({
                    id: source.id,
                    iban,
                    customer: customer.id
                });
            } catch (error) {
                console.log(`Something bad happened, ${error.message}`);
                res.json({
                    error
                });
            }
        }

    }
    charge = async(req, res) => {
        console.log('trying to charge :', req.body);
        const {customer, id} = req.body;

        const action = await this.stripe.charges.create({
            amount: 1000,
            currency: 'eur',
            customer,
            source: id
        });
        res.json(action);
    }

    webhook = async (req, res) => {
        const webhookbody = req.body;
        console.log(JSON.stringify(webhookbody));
        console.log('///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');

        const payload = get(webhookbody, 'data.object');
        const type = get(webhookbody, 'type');
        switch (type) {
            case 'source.transaction.created':
                this.app.socketIO.emit(type, payload);
                res.status(200).json({ status: true });
                break;
            case 'source.chargeable':
                // attach the source to customer before
                this.app.socketIO.emit(type, payload);
                res.status(200).json({ status: true });
                break;
            case 'charge.succeeded':
                // attach the source to customer before
                this.app.socketIO.emit(type, payload);
                res.status(200).json({ status: true });
                break;
            default:
                res.status(200).json({ status: true });
                break;
        }
    }
}

export default StripeController;
