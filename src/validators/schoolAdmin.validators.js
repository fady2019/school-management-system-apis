const { checkExact, body } = require('express-validator');

const { createUserValidators, updateUserValidators } = require('./user.validators');
const { objectIdValidator } = require('./shared.validators');

const getManagedSchoolIdValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'managedSchoolId'),
        objectIdValidator(body, 'managedSchoolId', { optional }),
    ].filter((validator) => validator);
};

const createSchoolAdminValidators = checkExact([
    ...createUserValidators,
    ...getManagedSchoolIdValidators(true),
]);

const updateSchoolAdminValidators = checkExact([
    ...updateUserValidators,
    ...getManagedSchoolIdValidators(true),
]);

module.exports = {
    createSchoolAdminValidators,
    updateSchoolAdminValidators,
};
