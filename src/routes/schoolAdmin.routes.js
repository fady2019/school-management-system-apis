const express = require('express');

const SchoolAdminController = require('../controllers/schoolAdmin.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const { userIdValidators } = require('../validators/user.validators');
const {
    createSchoolAdminValidators,
    updateSchoolAdminValidators,
} = require('../validators/schoolAdmin.validators');

const schoolAdminRouter = express.Router();

schoolAdminRouter.get('/all', SchoolAdminController.fetchSchoolAdmins);

schoolAdminRouter.post(
    '/create',
    createSchoolAdminValidators,
    userInputValidationResultChecker,
    SchoolAdminController.createSchoolAdmin
);

schoolAdminRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    SchoolAdminController.fetchSchoolAdminById
);

schoolAdminRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateSchoolAdminValidators,
    userInputValidationResultChecker,
    SchoolAdminController.updateSchoolAdmin
);

schoolAdminRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    SchoolAdminController.deleteSchoolAdmin
);

module.exports = schoolAdminRouter;
