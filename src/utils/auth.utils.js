const JWTUtils = require('./jwt.utils');
const CookieUtils = require('./cookie.utils');

require('../jsDocs/globalDefinitions');

class AuthUtils {
    static getAuthCookieName() {
        return process.env.AUTH_COOKIE_NAME || 'accessToken';
    }

    /**
     * @param {TContext} context
     * @param {TContextUser} payload
     */
    static setAuthCookie(context, payload) {
        const { id, expireAt } = JWTUtils.signJWT(payload);

        context.res?.cookie(this.getAuthCookieName(), id, {
            maxAge: expireAt - Date.now(),
            ...CookieUtils.getCookieOptions(),
        });
    }

    /**
     * @param {TContext} context
     */
    static resetAuthCookie(context) {
        context.res?.clearCookie(this.getAuthCookieName(), {
            ...CookieUtils.getCookieOptions(),
        });
    }
}

module.exports = AuthUtils;
