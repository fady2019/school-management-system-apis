const UserService = require('./User.service');
const PasswordUtils = require('../utils/password.utils');
const ResponseError = require('../models/ResponseError');

class AuthService {
    /**
     * @param {string} username the username of the target user
     * @param {string} password the entered password
     * @throws an error if there's no user with the entered username
     * @throws an error if the entered password and the original password don't match
     */
    static async login(username, password) {
        try {
            const user = await UserService.findUserByUsername(username);

            if (!user) {
                throw new ResponseError("There's no user with the entered username!", 404);
            }

            await PasswordUtils.shouldBeMatched(password, user.password);

            return {
                ...user.toJSON(),
                password: undefined,
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
