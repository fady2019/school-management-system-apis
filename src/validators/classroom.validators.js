const { param, checkExact, body } = require('express-validator');

const {
    requiredFieldValidator,
    objectIdValidator,
    stringFieldValidator,
    minLenFieldValidator,
} = require('./shared.validators');

const getClassroomNameValidators = (optional = false) => {
    return [
        optional ? undefined : requiredFieldValidator(body, 'name'),
        stringFieldValidator(body, 'name', { optional }),
        minLenFieldValidator(body, 'name', 2, { optional }),
    ].filter((validator) => validator);
};

const classroomIdValidators = [
    requiredFieldValidator(param, 'classroomId'),
    objectIdValidator(param, 'classroomId'),
];

const createClassroomValidators = checkExact([...getClassroomNameValidators()]);

const updateClassroomValidators = checkExact([...getClassroomNameValidators(true)]);

module.exports = {
    classroomIdValidators,
    createClassroomValidators,
    updateClassroomValidators,
};
