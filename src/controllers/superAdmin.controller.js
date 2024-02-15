const SuperAdminService = require('../services/SuperAdmin.service');
const UserService = require('../services/User.service');

require('../jsDocs/globalDefinitions');

class SuperAdminController {
    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSuperAdmins(req, res, next) {
        try {
            const admins = await SuperAdminService.fetchAll([req.user.userKey]);

            return res.json(admins);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async fetchSuperAdminById(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await UserService.findUserByType(userId, 'SuperAdmin');

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async createSuperAdmin(req, res, next) {
        try {
            const admin = await SuperAdminService.createSuperAdmin({
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
    static async updateSuperAdmin(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await SuperAdminService.updateSuperAdmin(userId, req.body);

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async deleteSuperAdmin(req, res, next) {
        try {
            const { userId } = req.params;

            const admin = await SuperAdminService.deleteSuperAdmin(userId);

            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = SuperAdminController;
