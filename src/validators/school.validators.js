const { checkExact, body, param } = require('express-validator');

const {
    requiredFieldValidator,
    objectIdValidator,
    stringFieldValidator,
    minLenFieldValidator,
} = require('./shared.validators');

const getSchoolNameValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'name'),
        stringFieldValidator(body, 'name', { optional }),
        minLenFieldValidator(body, 'name', 3, { optional }),
    ].filter((validator) => validator);
};

const schoolIdValidators = [requiredFieldValidator(param, 'schoolId'), objectIdValidator(param, 'schoolId')];

const createSchoolValidators = checkExact([...getSchoolNameValidators()]);

const updateSchoolValidators = checkExact([...getSchoolNameValidators(true)]);

module.exports = {
    schoolIdValidators,
    createSchoolValidators,
    updateSchoolValidators,
};
