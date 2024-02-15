const jwt = require('jsonwebtoken');

const privateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('ascii');
const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('ascii');
const expiresIn = String(process.env.JWT_EXPIRE_IN || '1h');

class JWTUtils {
    /**
     * @param {Record<string, any>} payload
     * @param {jwt.SignOptions} options
     */
    static signJWT(payload, options) {
        const token = jwt.sign(payload, privateKey, {
            ...(options && options),
            expiresIn,
            algorithm: 'RS256',
        });

        const exp = jwt.decode(token).exp;

        return {
            id: token,
            expireAt: exp * 1000,
        };
    }

    /**
     * @param {string} token
     * @param {jwt.VerifyOptions} options
     */
    static verifyJWT(token, options) {
        try {
            return jwt.verify(token, publicKey, { ...(options || {}) });
        } catch (error) {
            return null;
        }
    }
}

module.exports = JWTUtils;
