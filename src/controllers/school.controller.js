const SchoolService = require('../services/School.service');

require('../jsDocs/globalDefinitions');

class SchoolController {
    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSchools(_req, res, next) {
        try {
            const schools = await SchoolService.fetchAll();

            return res.json(schools);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSchoolById(req, res, next) {
        try {
            const { schoolId } = req.params;

            const school = await SchoolService.fetchById(schoolId);

            return res.json(school);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async createSchool(req, res, next) {
        try {
            const { userKey } = req.user || {};

            const school = await SchoolService.createSchool({
                ...req.body,
                creatorId: userKey,
            });

            return res.json(school);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async updateSchool(req, res, next) {
        try {
            const { schoolId } = req.params;

            const school = await SchoolService.updateSchool(schoolId, req.body);

            return res.json(school);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async deleteSchool(req, res, next) {
        try {
            const { schoolId } = req.params;

            const school = await SchoolService.deleteSchool(schoolId);

            return res.json(school);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = SchoolController;
