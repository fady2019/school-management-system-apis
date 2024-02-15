const express = require('express');

const SchoolController = require('../controllers/school.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const {
    schoolIdValidators,
    createSchoolValidators,
    updateSchoolValidators,
} = require('../validators/school.validators');

const schoolRouter = express.Router();

schoolRouter.get('/all', SchoolController.fetchSchools);

schoolRouter.post(
    '/create',
    createSchoolValidators,
    userInputValidationResultChecker,
    SchoolController.createSchool
);

schoolRouter.get(
    '/:schoolId',
    schoolIdValidators,
    userInputValidationResultChecker,
    SchoolController.fetchSchoolById
);

schoolRouter.patch(
    '/:schoolId/update',
    schoolIdValidators,
    updateSchoolValidators,
    userInputValidationResultChecker,
    SchoolController.updateSchool
);

schoolRouter.delete(
    '/:schoolId/delete',
    schoolIdValidators,
    userInputValidationResultChecker,
    SchoolController.deleteSchool
);

module.exports = schoolRouter;
