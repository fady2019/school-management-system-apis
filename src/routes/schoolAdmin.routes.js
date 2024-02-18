const express = require('express');

const SchoolAdminController = require('../controllers/schoolAdmin.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const { userIdValidators } = require('../validators/user.validators');
const {
    createSchoolAdminValidators,
    updateSchoolAdminValidators,
} = require('../validators/schoolAdmin.validators');

const schoolAdminRouter = express.Router();

/**
 * @openapi
 * /api/school-admin/all:
 *   get:
 *     tags:
 *       - School Admins
 *     summary: Fetch School Admins.
 *     description: Fetching all School Admins in the system.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolAdmin'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolAdminRouter.get('/all', SchoolAdminController.fetchSchoolAdmins);

/**
 * @openapi
 * /api/school-admin/create:
 *   post:
 *     tags:
 *       - School Admins
 *     summary: Create a new School Admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSchoolAdminInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolAdmin'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolAdminRouter.post(
    '/create',
    createSchoolAdminValidators,
    userInputValidationResultChecker,
    SchoolAdminController.createSchoolAdmin
);

/**
 * @openapi
 * /api/school-admin/{userId}:
 *   get:
 *     tags:
 *       - School Admins
 *     summary: Get a School Admin by ID.
 *     description: Getting a specific School Admin by ID if any, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target School Admin
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SchoolAdmin'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolAdminRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    SchoolAdminController.fetchSchoolAdminById
);

/**
 * @openapi
 * /api/school-admin/{userId}/update:
 *   patch:
 *     tags:
 *       - School Admins
 *     summary: Update a School Admin.
 *     description: Updating a specific School Admin if any and returning the updated version, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target School Admin
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolAdminInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SchoolAdmin'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolAdminRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateSchoolAdminValidators,
    userInputValidationResultChecker,
    SchoolAdminController.updateSchoolAdmin
);

/**
 * @openapi
 * /api/school-admin/{userId}/delete:
 *   delete:
 *     tags:
 *       - School Admins
 *     summary: Delete a School Admin.
 *     description: >
 *       Deleting a specific School Admin if any and returning the deleted version, otherwise returns null. <br> <br>
 *       Performing the deletion successfully leads to setting the “creatorId” to null for Students and Classrooms created by the deleted School Admin which means removing the relation between that School Admin and the mentioned entities.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target School Admin
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/SchoolAdmin'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolAdminRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    SchoolAdminController.deleteSchoolAdmin
);

module.exports = schoolAdminRouter;
