const express = require('express');

const ClassroomController = require('../controllers/classroom.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const {
    classroomIdValidators,
    createClassroomValidators,
    updateClassroomValidators,
} = require('../validators/classroom.validators');

const classroomRouter = express.Router();

classroomRouter.get('/all', ClassroomController.fetchClassrooms);

classroomRouter.post(
    '/create',
    createClassroomValidators,
    userInputValidationResultChecker,
    ClassroomController.createClassroom
);

classroomRouter.get(
    '/:classroomId',
    classroomIdValidators,
    userInputValidationResultChecker,
    ClassroomController.fetchClassroomById
);

classroomRouter.patch(
    '/:classroomId/update',
    classroomIdValidators,
    updateClassroomValidators,
    userInputValidationResultChecker,
    ClassroomController.updateClassroom
);

classroomRouter.delete(
    '/:classroomId/delete',
    classroomIdValidators,
    userInputValidationResultChecker,
    ClassroomController.deleteClassroom
);

module.exports = classroomRouter;
