const express = require('express');

const ClassroomController = require('../controllers/classroom.controller');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');
const {
    classroomIdValidators,
    createClassroomValidators,
    updateClassroomValidators,
} = require('../validators/classroom.validators');

const classroomRouter = express.Router();

/**
 * @openapi
 * /api/classroom/all:
 *   get:
 *     tags:
 *       - Classrooms
 *     summary: Fetch Classrooms.
 *     description: Fetching all Classrooms in the School managed by the logged in School Admin.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Classroom'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
classroomRouter.get('/all', ClassroomController.fetchClassrooms);

/**
 * @openapi
 * /api/classroom/create:
 *   post:
 *     tags:
 *       - Classrooms
 *     summary: Create a new Classroom.
 *     description: Creating a new Classroom in the School managed by the logged in School Admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassroomInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
classroomRouter.post(
    '/create',
    createClassroomValidators,
    userInputValidationResultChecker,
    ClassroomController.createClassroom
);

/**
 * @openapi
 * /api/classroom/{classroomId}:
 *   get:
 *     tags:
 *       - Classrooms
 *     summary: Get a Classroom by ID.
 *     description: Getting a specific Classroom by ID in the School managed by the logged in School Admin if any, otherwise returns null.
 *     parameters:
 *       - $ref: '#/components/parameters/ClassroomIdParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Classroom'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
classroomRouter.get(
    '/:classroomId',
    classroomIdValidators,
    userInputValidationResultChecker,
    ClassroomController.fetchClassroomById
);

/**
 * @openapi
 * /api/classroom/{classroomId}/update:
 *   patch:
 *     tags:
 *       - Classrooms
 *     summary: Update a Classroom.
 *     description: Updating a specific Classroom in the School managed by the logged in School Admin if any and returning the updated version, otherwise returns null.
 *     parameters:
 *       - $ref: '#/components/parameters/ClassroomIdParam'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Classroom'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
classroomRouter.patch(
    '/:classroomId/update',
    classroomIdValidators,
    updateClassroomValidators,
    userInputValidationResultChecker,
    ClassroomController.updateClassroom
);

/**
 * @openapi
 * /api/classroom/{classroomId}/delete:
 *   delete:
 *     tags:
 *       - Classrooms
 *     summary: Delete a Classroom.
 *     description: >
 *       Deleting a specific Classroom from the School managed by the logged in School Admin if any and returning the deleted version, otherwise returns null. <br> <br>
 *       Performing the deletion successfully leads to setting the “classroomId” to null for all Students of that Classroom. which means removing the relation between that Classroom and the mentioned entities.
 *     parameters:
 *       - $ref: '#/components/parameters/ClassroomIdParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Classroom'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityError'
 *       5xx:
 *         $ref: '#/components/responses/ServerError'
 */
classroomRouter.delete(
    '/:classroomId/delete',
    classroomIdValidators,
    userInputValidationResultChecker,
    ClassroomController.deleteClassroom
);

module.exports = classroomRouter;
