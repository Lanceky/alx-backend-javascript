// 6-payment_token.js
function getPaymentTokenFromAPI(success) {
    if (success) {
        return Promise.resolve({ data: 'Successful response from the API' });
    }
    // Do nothing if success is false
    return null;
}

module.exports = getPaymentTokenFromAPI;
