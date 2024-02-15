const UserService = require('../services/User.service');
const SchoolAdminService = require('../services/SchoolAdmin.service');

require('../jsDocs/globalDefinitions');

class SchoolAdminController {
    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSchoolAdmins(_req, res, next) {
        try {
            const admins = await SchoolAdminService.fetchAll();

            return res.json(admins);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSchoolAdminById(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await UserService.findUserByType(userId, 'SchoolAdmin');

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async createSchoolAdmin(req, res, next) {
        try {
            const admin = await SchoolAdminService.createSchoolAdmin({
                ...req.body,
                creatorId: req.user.userKey,
            });

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async updateSchoolAdmin(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await SchoolAdminService.updateSchoolAdmin(userId, req.body);

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async deleteSchoolAdmin(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await SchoolAdminService.deleteSchoolAdmin(userId);

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = SchoolAdminController;
