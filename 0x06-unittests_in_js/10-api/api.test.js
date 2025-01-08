const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./api');

chai.use(chaiHttp);
const { expect } = chai;

describe('API Integration Tests', () => {
    // Test suite for /available_payments
    describe('GET /available_payments', () => {
        it('should return payment methods object', (done) => {
            chai.request(app)
                .get('/available_payments')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal({
                        payment_methods: {
                            credit_cards: true,
                            paypal: false,
                        },
                    });
                    done();
                });
        });
    });

    // Test suite for /login
    describe('POST /login', () => {
        it('should return a welcome message with the username', (done) => {
            chai.request(app)
                .post('/login')
                .send({ userName: 'Betty' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Welcome Betty');
                    done();
                });
        });

        it('should return 400 if userName is not provided', (done) => {
            chai.request(app)
                .post('/login')
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Bad Request');
                    done();
                });
        });
    });
});

