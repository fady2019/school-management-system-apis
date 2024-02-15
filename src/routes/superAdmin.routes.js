const express = require('express');

const SuperAdminController = require('../controllers/superAdmin.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const { userIdValidators } = require('../validators/user.validators');
const {
    createSuperAdminValidators,
    updateSuperAdminValidators,
} = require('../validators/superAdmin.validators');

const superAdminRouter = express.Router();

superAdminRouter.get('/all', SuperAdminController.fetchSuperAdmins);

superAdminRouter.post(
    '/create',
    createSuperAdminValidators,
    userInputValidationResultChecker,
    SuperAdminController.createSuperAdmin
);

superAdminRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    SuperAdminController.fetchSuperAdminById
);

superAdminRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateSuperAdminValidators,
    userInputValidationResultChecker,
    SuperAdminController.updateSuperAdmin
);

superAdminRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    SuperAdminController.deleteSuperAdmin
);

module.exports = superAdminRouter;
