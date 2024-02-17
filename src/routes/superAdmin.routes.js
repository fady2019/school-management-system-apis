const express = require('express');

const SuperAdminController = require('../controllers/superAdmin.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const { userIdValidators } = require('../validators/user.validators');
const {
    createSuperAdminValidators,
    updateSuperAdminValidators,
} = require('../validators/superAdmin.validators');

const superAdminRouter = express.Router();

/**
 * @openapi
 * /api/super-admin/all:
 *   get:
 *     tags:
 *       - Super Admins
 *     summary: Fetch Super Admins.
 *     description: Fetching all Super Admins in the system except the logged in one.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SuperAdmin'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       403:
 *         description: Forbidden
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
superAdminRouter.get('/all', SuperAdminController.fetchSuperAdmins);

/**
 * @openapi
 * /api/super-admin/create:
 *   post:
 *     tags:
 *       - Super Admins
 *     summary: Create a new Super Admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSuperAdminInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuperAdmin'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       409:
 *         description: Conflict
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
superAdminRouter.post(
    '/create',
    createSuperAdminValidators,
    userInputValidationResultChecker,
    SuperAdminController.createSuperAdmin
);

/**
 * @openapi
 * /api/super-admin/{userId}:
 *   get:
 *     tags:
 *       - Super Admins
 *     summary: Get a Super Admin by ID.
 *     description: Getting a specific Super Admin by ID if any, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Super Admin
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SuperAdmin'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       403:
 *         description: Forbidden
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
superAdminRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    SuperAdminController.fetchSuperAdminById
);

/**
 * @openapi
 * /api/super-admin/{userId}/update:
 *   patch:
 *     tags:
 *       - Super Admins
 *     summary: Update a Super Admin.
 *     description: Updating a specific Super Admin if any and returning the updated version, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Super Admin
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSuperAdminInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SuperAdmin'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       409:
 *         description: Conflict
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
superAdminRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateSuperAdminValidators,
    userInputValidationResultChecker,
    SuperAdminController.updateSuperAdmin
);

/**
 * @openapi
 * /api/super-admin/{userId}/delete:
 *   delete:
 *     tags:
 *       - Super Admins
 *     summary: Delete a Super Admin.
 *     description: >
 *       Deleting a specific Super Admin if any and returning the deleted version, otherwise returns null. <br> <br>
 *       Performing the deletion successfully leads to setting the “creatorId” to null for Super Admins, School Admins and Schools created by the deleted Super Admin which means removing the relation between that Super Admin and the mentioned entities. 
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Super Admin
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SuperAdmin'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *       403:
 *         description: Forbidden
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
superAdminRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    SuperAdminController.deleteSuperAdmin
);

module.exports = superAdminRouter;
