const StudentService = require('../services/Student.service');

require('../jsDocs/globalDefinitions');

class StudentController {
    /**
     * @type {ExpressMiddleware}
     */
    static async fetchStudents(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { classroomId, level } = req.query;

            const students = await StudentService.fetchAll(managedSchoolId, { classroomId, level });

            res.json(students);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async fetchStudentById(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { userId } = req.params;

            const student = await StudentService.fetchById(managedSchoolId, userId);

            return res.json(student);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async createStudent(req, res, next) {
        try {
            const { managedSchoolId, userKey } = req.user || {};

            const student = await StudentService.createStudent({
                ...req.body,
                creatorId: userKey,
                schoolId: managedSchoolId,
            });

            return res.json(student);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async updateStudent(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { userId } = req.params;

            const student = await StudentService.updateStudent(managedSchoolId, userId, req.body);

            return res.json(student);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async deleteStudent(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { userId } = req.params;

            const student = await StudentService.deleteStudent(managedSchoolId, userId);

            return res.json(student);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = StudentController;
