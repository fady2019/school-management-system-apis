const ResponseError = require('../models/ResponseError');
const { User } = require('../schemas/user.schema');

require('../jsDocs/globalDefinitions');

class UserService {
    /**
     * @param {string} username
     * @param {Array<TObjectId>} excludedIds
     * @throws an error if there's already a user with the entered username
     */
    static async shouldBeUniqueUsername(username, excludedIds = []) {
        try {
            const user = await this.findUserByUsername(username, excludedIds);

            if (!!user) {
                throw new ResponseError('The entered username is already in-use!', 409);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {string} username
     * @param {Array<TObjectId>} excludedIds
     */
    static async findUserByUsername(username, excludedIds = []) {
        try {
            return await User.findOne({ username, _id: { $nin: excludedIds } }).exec();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {string} userId
     * @param {TUserType} userType
     */
    static async findUserByType(userId, userType) {
        try {
            const user = await User.findOne({ _id: userId, userType }).select('-password').exec();

            if (!user) {
                return null;
            }

            return user?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
