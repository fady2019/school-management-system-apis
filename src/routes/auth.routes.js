const express = require('express');

const AuthController = require('../controllers/auth.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const tokenChecker = require('../middlewares/tokenChecker.mw');
const { loginValidators } = require('../validators/auth.validators');

const authRouter = express.Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login as Super Admin, School Admin or Student.
 *     description: Performing Login successfully leads to setting a cookie that contains the authentication token to the response headers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/SuperAdmin'
 *                 - $ref: '#/components/schemas/SchoolAdmin'
 *                 - $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       5xx:
 *         description: Server Issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
authRouter.post('/login', loginValidators, userInputValidationResultChecker, AuthController.login);

/**
 * @openapi
 * /api/auth/auto-login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get the user’s information if possible.
 *     description: Getting the user’s information using the authentication token that’s stored in a cookie if any, otherwise returns null.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               oneOf:
 *                 - $ref: '#/components/schemas/SuperAdmin'
 *                 - $ref: '#/components/schemas/SchoolAdmin'
 *                 - $ref: '#/components/schemas/Student'
 *       5xx:
 *         description: Server Issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
authRouter.get('/auto-login', tokenChecker({ setNullIfNoToken: true }), AuthController.autoLogin);

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     tags:
 *     - Authentication
 *     summary: Logout the user.
 *     description: Clearing the authentication token cookie.
 *     responses:
 *       200:
 *         description: Success
 *       5xx:
 *         description: Server Issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
authRouter.get('/logout', AuthController.logout);

module.exports = authRouter;
