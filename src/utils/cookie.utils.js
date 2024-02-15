class CookieUtils {
    static getCookieOptions() {
        return {
            httpOnly: process.env.COOKIE_HTTP_ONLY == 'true',
            domain: process.env.COOKIE_DOMAIN,
            path: '/',
            sameSite: process.env.COOKIE_SAME_SITE,
            secure: process.env.COOKIE_SECURE == 'true',
        };
    }

    /**
     * @param {string} cookieString
     * @returns
     */
    static convertCookieStringToObject(cookieString = '') {
        const cookies = cookieString.split('; ');

        return cookies.reduce((cookieObj, currCookie) => {
            const [key, ...value] = currCookie.split('=');

            return {
                ...cookieObj,
                [key]: value.join('='),
            };
        }, {});
    }
}

module.exports = CookieUtils;
