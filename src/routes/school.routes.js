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
 *       - name: schoolId
 *         in: path
 *         description: The id of the target School
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
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
 *       - name: schoolId
 *         in: path
 *         description: The id of the target School
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
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
 *       Performing the deletion successfully leads to deleting all Students and Classrooms of that School and setting the “managedSchoolId” to null for all SchoolAdmins of that school. which means removing the relation between that School and the mentioned entities.
 *     parameters:
 *       - name: schoolId
 *         in: path
 *         description: The id of the target School
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
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
schoolRouter.delete(
    '/:schoolId/delete',
    schoolIdValidators,
    userInputValidationResultChecker,
    SchoolController.deleteSchool
);

module.exports = schoolRouter;
