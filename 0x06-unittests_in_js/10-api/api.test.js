const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./api');

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
    describe('GET /', () => {
        it('should return welcome message', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Welcome to the payment system');
                    done();
                });
        });
    });

    describe('GET /cart/:id', () => {
        it('should return payment methods for valid cart id', (done) => {
            chai.request(app)
                .get('/cart/123')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Payment methods for cart 123');
                    done();
                });
        });

        it('should return 400 for invalid cart id', (done) => {
            chai.request(app)
                .get('/cart/abc')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Invalid cart id');
                    done();
                });
        });
    });

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

    describe('POST /login', () => {
        it('should return welcome message with username', (done) => {
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

