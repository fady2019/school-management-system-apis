const ResponseError = require('../models/ResponseError');
const { User } = require('../schemas/user.schema');

require('../jsDocs/globalDefinitions');

/**
 * A middleware that checks that the current user's type is allowed
 *
 * @param {{ allowedUsers: Array<TUserType>, throwNoErrorIfNoUser?: boolean }} options
 */
const userTypeChecker = (options) => {
    const { throwNoErrorIfNoUser, allowedUsers: allowedUsersArray } = options;

    const allowedUsers = new Set(allowedUsersArray);

    /**
     * @type {ExpressMiddleware}
     */
    return async (req, _res, next) => {
        if (req.method === 'OPTIONS' || (throwNoErrorIfNoUser === true && !req.user)) {
            return next();
        }

        const { userType, userKey } = req.user || {};

        const user = await User.findOne({
            _id: userKey,
            userType,
        }).exec();

        if (!user || !allowedUsers.has(user.userType)) {
            return next(new ResponseError('Forbidden!', 403));
        }

        next();
    };
};

module.exports = userTypeChecker;
