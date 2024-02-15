const bcrypt = require('bcrypt');

const ResponseError = require('../models/ResponseError');

class PasswordUtils {
    /**
     * @param {string} password
     * @param {number} salt
     * @returns
     */
    static async hashPassword(password, salt = 12) {
        return await bcrypt.hash(password, salt);
    }

    /**
     * @param {string} enteredPassword
     * @param {string} encryptedPassword
     * @throws an error if the enteredPassword and encryptedPassword don't match
     */
    static async shouldBeMatched(enteredPassword, encryptedPassword) {
        const isCorrectPassword = await bcrypt.compare(enteredPassword, encryptedPassword);

        if (!isCorrectPassword) {
            throw new ResponseError('Incorrect Password!', 401);
        }
    }
}

module.exports = PasswordUtils;
