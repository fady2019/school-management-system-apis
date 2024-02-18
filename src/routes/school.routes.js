const express = require('express');

const SchoolController = require('../controllers/school.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const {
    schoolIdValidators,
    createSchoolValidators,
    updateSchoolValidators,
} = require('../validators/school.validators');

const schoolRouter = express.Router();

/**
 * @openapi
 * /api/school/all:
 *   get:
 *     tags:
 *       - Schools
 *     summary: Fetch Schools.
 *     description: Fetching all Schools in the system.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolRouter.get('/all', SchoolController.fetchSchools);

/**
 * @openapi
 * /api/school/create:
 *   post:
 *     tags:
 *       - Schools
 *     summary: Create a new School.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSchoolInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolRouter.post(
    '/create',
    createSchoolValidators,
    userInputValidationResultChecker,
    SchoolController.createSchool
);

/**
 * @openapi
 * /api/school/{schoolId}:
 *   get:
 *     tags:
 *       - Schools
 *     summary: Get a school by ID.
 *     description: Getting a specific School by ID if any, otherwise returns null.
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolRouter.get(
    '/:schoolId',
    schoolIdValidators,
    userInputValidationResultChecker,
    SchoolController.fetchSchoolById
);

/**
 * @openapi
 * /api/school/{schoolId}/update:
 *   patch:
 *     tags:
 *       - Schools
 *     summary: Update a School.
 *     description: Updating a specific School if any and returning the updated version, otherwise returns null.
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolRouter.patch(
    '/:schoolId/update',
    schoolIdValidators,
    updateSchoolValidators,
    userInputValidationResultChecker,
    SchoolController.updateSchool
);

/**
 * @openapi
 * /api/school/{schoolId}/delete:
 *   delete:
 *     tags:
 *       - Schools
 *     summary: Delete a School.
 *     description: >
 *       Deleting a specific School if any and returning the deleted version, otherwise returns null. <br> <br>
 *       Performing the deletion successfully leads to deleting all Students and Classrooms of that School and setting the “managedSchoolId” to null for all SchoolAdmins of that School. which means removing the relation between that School and the mentioned entities.
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
schoolRouter.delete(
    '/:schoolId/delete',
    schoolIdValidators,
    userInputValidationResultChecker,
    SchoolController.deleteSchool
);

module.exports = schoolRouter;
