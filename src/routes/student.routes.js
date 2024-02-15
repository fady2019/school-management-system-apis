const express = require('express');

const StudentController = require('../controllers/student.controller');
const { userIdValidators } = require('../validators/user.validators');
const {
    fetchAllStudentsFiltersValidators,
    createStudentValidators,
    updateStudentValidators,
} = require('../validators/student.validators');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');

const studentRouter = express.Router();

studentRouter.get(
    '/all',
    fetchAllStudentsFiltersValidators,
    userInputValidationResultChecker,
    StudentController.fetchStudents
);

studentRouter.post(
    '/create',
    createStudentValidators,
    userInputValidationResultChecker,
    StudentController.createStudent
);

studentRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    StudentController.fetchStudentById
);

studentRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateStudentValidators,
    userInputValidationResultChecker,
    StudentController.updateStudent
);

studentRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    StudentController.deleteStudent
);

module.exports = studentRouter;
