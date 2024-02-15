const { query, checkExact, body } = require('express-validator');

const {
    requiredFieldValidator,
    objectIdValidator,
    numericFieldValidator,
    minIntFieldValidator,
    maxIntFieldValidator,
} = require('./shared.validators');
const { createUserValidators, updateUserValidators } = require('./user.validators');

const getStudentLevelValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'level'),
        numericFieldValidator(body, 'level', { optional }),
        minIntFieldValidator(body, 'level', 1, { optional }),
        maxIntFieldValidator(body, 'level', 18, { optional }),
    ].filter((validator) => validator);
};

const getStudentClassroomIdValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'classroomId'),
        objectIdValidator(body, 'classroomId', { optional }),
    ].filter((validator) => validator);
};

const fetchAllStudentsFiltersValidators = [
    objectIdValidator(query, 'classroomId', { optional: true }),
    numericFieldValidator(query, 'level', { optional: true }),
    minIntFieldValidator(query, 'level', 1, { optional: true }),
    maxIntFieldValidator(query, 'level', 18, { optional: true }),
];

const createStudentValidators = checkExact([
    ...createUserValidators,
    ...getStudentLevelValidators(),
    ...getStudentClassroomIdValidators(true),
]);

const updateStudentValidators = checkExact([
    ...updateUserValidators,
    ...getStudentLevelValidators(true),
    ...getStudentClassroomIdValidators(true),
]);

module.exports = {
    fetchAllStudentsFiltersValidators,
    createStudentValidators,
    updateStudentValidators,
};
