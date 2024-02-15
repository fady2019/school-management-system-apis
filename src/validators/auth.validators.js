const { checkExact, body } = require('express-validator');

const { requiredFieldValidator } = require('./shared.validators');

const loginValidators = checkExact([
    requiredFieldValidator(body, 'username'),
    requiredFieldValidator(body, 'password'),
]);

module.exports = {
    loginValidators,
};
