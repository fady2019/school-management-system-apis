const { body, param } = require('express-validator');

const {
    requiredFieldValidator,
    stringFieldValidator,
    minLenFieldValidator,
    objectIdValidator,
} = require('./shared.validators');

const getNameValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'name'),
        stringFieldValidator(body, 'name', { optional }),
        minLenFieldValidator(body, 'name', 2, { optional }),
    ].filter((validator) => validator);
};

const getUsernameValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'username'),
        stringFieldValidator(body, 'username', { optional }),
        minLenFieldValidator(body, 'username', 3, { optional }),
    ].filter((validator) => validator);
};

const getPasswordValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'password'),
        stringFieldValidator(body, 'password', { optional }),
        minLenFieldValidator(body, 'password', 6, { optional }),
    ].filter((validator) => validator);
};

const createUserValidators = [...getNameValidators(), ...getUsernameValidators(), ...getPasswordValidators()];

const updateUserValidators = [
    ...getNameValidators(true),
    ...getUsernameValidators(true),
    ...getPasswordValidators(true),
];

const userIdValidators = [requiredFieldValidator(param, 'userId'), objectIdValidator(param, 'userId')];

module.exports = {
    getNameValidators,
    getUsernameValidators,
    getPasswordValidators,

    createUserValidators,
    updateUserValidators,
    userIdValidators,
};
