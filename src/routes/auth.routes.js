const express = require('express');

const AuthController = require('../controllers/auth.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const tokenChecker = require('../middlewares/tokenChecker.mw');
const { loginValidators } = require('../validators/auth.validators');

const authRouter = express.Router();

authRouter.post('/login', loginValidators, userInputValidationResultChecker, AuthController.login);

authRouter.get('/auto-login', tokenChecker({ setNullIfNoToken: true }), AuthController.autoLogin);

authRouter.get('/logout', AuthController.logout);

module.exports = authRouter;
