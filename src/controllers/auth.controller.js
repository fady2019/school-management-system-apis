const AuthService = require('../services/Auth.service');
const UserService = require('../services/User.service');
const AuthUtils = require('../utils/auth.utils');

require('../jsDocs/globalDefinitions');

class AuthController {
    /**
     * @type {ExpressMiddleware}
     */
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await AuthService.login(username, password);

            AuthUtils.setAuthCookie({ res }, { userKey: user._id, userType: user.userType });

            return res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async autoLogin(req, res, next) {
        try {
            const { userKey, userType } = req.user || {};

            const user = await UserService.findUserByType(userKey, userType);

            return res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @type {ExpressMiddleware}
     */
    static async logout(_req, res, next) {
        try {
            AuthUtils.resetAuthCookie({ res });

            return res.end();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = AuthController;
