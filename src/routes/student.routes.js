const express = require('express');

const StudentController = require('../controllers/student.controller');
const { userIdValidators } = require('../validators/user.validators');
const {
    fetchAllStudentsFiltersValidators,
    createStudentValidators,
    updateStudentValidators,
} = require('../validators/student.validators');
const userInputValidationResultChecker = require('../middlewares/userInputValidationResultChecker.mw');

const studentRouter = express.Router();

/**
 * @openapi
 * /api/student/all:
 *   get:
 *     tags:
 *       - Students
 *     summary: Fetch Students.
 *     description: Fetching all Students in the School managed by the logged in School Admin.
 *     parameters:
 *       - name: classroomId
 *         in: query
 *         description: The id of the classroom, set it to filter students by classroom.
 *         required: false
 *         schema:
 *           type: string
 *
 *       - name: level
 *         in: query
 *         description: The level of students, set it to filter students by level.
 *         required: false
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 18
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
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
studentRouter.get(
    '/all',
    fetchAllStudentsFiltersValidators,
    userInputValidationResultChecker,
    StudentController.fetchStudents
);

/**
 * @openapi
 * /api/student/create:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create a new Student.
 *     description: Creating a new Student in the School managed by the logged in School Admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
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
studentRouter.post(
    '/create',
    createStudentValidators,
    userInputValidationResultChecker,
    StudentController.createStudent
);

/**
 * @openapi
 * /api/student/{userId}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a Student by ID.
 *     description: Getting a specific Student by ID in the School managed by the logged in School Admin if any, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Student
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Student'
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
studentRouter.get(
    '/:userId',
    userIdValidators,
    userInputValidationResultChecker,
    StudentController.fetchStudentById
);

/**
 * @openapi
 * /api/student/{userId}/update:
 *   patch:
 *     tags:
 *       - Students
 *     summary: Update a Student.
 *     description: Updating a specific Student in the School managed by the logged in School Admin if any and returning the updated version, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Student
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudentInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Student'
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
studentRouter.patch(
    '/:userId/update',
    userIdValidators,
    updateStudentValidators,
    userInputValidationResultChecker,
    StudentController.updateStudent
);

/**
 * @openapi
 * /api/student/{userId}/delete:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Delete a Student.
 *     description:
 *       Deleting a specific Student from the School managed by the logged in School Admin if any and returning the deleted version, otherwise returns null.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The id of the target Student
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               allOf:
 *                 - $ref: '#/components/schemas/Student'
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
studentRouter.delete(
    '/:userId/delete',
    userIdValidators,
    userInputValidationResultChecker,
    StudentController.deleteStudent
);

module.exports = studentRouter;
