const ResponseError = require('../models/ResponseError');
const AuthUtils = require('../utils/auth.utils');
const JWTUtils = require('../utils/jwt.utils');

require('../jsDocs/globalDefinitions');

/**
 * A middleware that checks the token and extracts the information inside it
 *
 * @param {{ ignoreExpiration?: boolean, setNullIfNoToken?: boolean } | undefined} options
 */
const tokenChecker = (options) => {
    const { ignoreExpiration, setNullIfNoToken } = options || {};

    /**
     * @type {ExpressMiddleware}
     */
    return (req, _res, next) => {
        if (req.method === 'OPTIONS') {
            return next();
        }

        const authCookieName = AuthUtils.getAuthCookieName();

        const token = req.cookies[authCookieName];

        if (!token && setNullIfNoToken !== true) {
            return next(new ResponseError('Unauthorized, a token is required!', 401));
        } else if (!token && setNullIfNoToken === true) {
            req.user = null;
        } else {
            req.user = JWTUtils.verifyJWT(token, { ignoreExpiration: ignoreExpiration === true });
        }

        next();
    };
};

module.exports = tokenChecker;
