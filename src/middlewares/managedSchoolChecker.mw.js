const ResponseError = require('../models/ResponseError');
const { SchoolAdmin } = require('../schemas/schoolAdmin.schema');

require('../jsDocs/globalDefinitions');

/**
 * A middleware that checks that the school admin is already managing a school and extracts the school id
 */
const managedSchoolChecker = () => {
    /**
     * @type {ExpressMiddleware}
     */
    return async (req, _res, next) => {
        if (req.method === 'OPTIONS') {
            return next();
        }

        const userKey = req?.user?.userKey || '';

        const schoolAdmin = await SchoolAdmin.findById(userKey)
            .populate('managedSchoolId')
            .select('managedSchoolId')
            .exec();

        const managedSchool = schoolAdmin.managedSchoolId;

        if (!managedSchool) {
            return next(new ResponseError("Forbidden, there's no school you manage!", 403));
        }

        req.user.managedSchoolId = managedSchool._id;

        next();
    };
};

module.exports = managedSchoolChecker;
