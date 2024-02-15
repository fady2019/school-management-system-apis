const { checkExact } = require('express-validator');

const { createUserValidators, updateUserValidators } = require('./user.validators');

const createSuperAdminValidators = checkExact([...createUserValidators]);

const updateSuperAdminValidators = checkExact([...updateUserValidators]);

module.exports = {
    createSuperAdminValidators,
    updateSuperAdminValidators,
};
