const ClassroomService = require('../services/Classroom.service');

require('../jsDocs/globalDefinitions');

class ClassroomController {
    /**
     * @type {ExpressMiddleware}
     */
    static async fetchClassrooms(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};

            const classrooms = await ClassroomService.fetchAll(managedSchoolId);

            res.json(classrooms);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async fetchClassroomById(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { classroomId } = req.params;

            const classroom = await ClassroomService.fetchById(managedSchoolId, classroomId);

            return res.json(classroom);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async createClassroom(req, res, next) {
        try {
            const { managedSchoolId, userKey } = req.user || {};

            const classroom = await ClassroomService.createClassroom({
                ...req.body,
                creatorId: userKey,
                schoolId: managedSchoolId,
            });

            return res.json(classroom);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async updateClassroom(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { classroomId } = req.params;

            const classroom = await ClassroomService.updateClassroom(managedSchoolId, classroomId, req.body);

            return res.json(classroom);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async deleteClassroom(req, res, next) {
        try {
            const { managedSchoolId } = req.user || {};
            const { classroomId } = req.params;

            const classroom = await ClassroomService.deleteClassroom(managedSchoolId, classroomId);

            return res.json(classroom);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ClassroomController;
