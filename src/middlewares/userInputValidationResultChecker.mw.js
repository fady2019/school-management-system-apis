const { validationResult } = require('express-validator');

const ResponseError = require('../models/ResponseError');

require('../jsDocs/globalDefinitions');

/**
 * @type {ExpressMiddleware}
 */
const userInputValidationResultChecker = (req, _res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return next(new ResponseError(validation.array().at(0)?.msg, 422));
    }

    next();
};

module.exports = userInputValidationResultChecker;
