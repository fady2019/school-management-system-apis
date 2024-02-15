const { isValidObjectId } = require('mongoose');

/**
 * @typedef {{ optional?: boolean } | undefined} ValidatorsOptions
 *
 * @typedef {(fields?: string | string[], message?: import('express-validator').FieldMessageFactory | import('express-validator/src/base').ErrorMessage) => import('express-validator').ValidationChain} ValidationLocation
 */

/**
 * @param {any} value
 * @param {boolean | undefined} optional
 * @returns
 */
const allowChecking = (value, optional) => optional !== true || (value !== null && value !== undefined);

/**
 * convert "null" to null & "undefined" to undefined
 * @param {any} value
 */
const toNullable = (value) => (value === 'null' ? null : value === 'undefined' ? undefined : value);

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {boolean} falsy
 */
const requiredFieldValidator = (location, fieldName, falsy = true) => {
    return location(fieldName)
        .exists({ values: falsy ? 'falsy' : undefined })
        .withMessage(`The '${fieldName}' field is required!`);
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {ValidatorsOptions} options
 */
const stringFieldValidator = (location, fieldName, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .isString()
        .withMessage(`The '${fieldName}' field should be string!`);
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {number} minLen
 * @param {ValidatorsOptions} options
 */
const minLenFieldValidator = (location, fieldName, minLen, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .isLength({ min: minLen })
        .withMessage(`The '${fieldName}' field should be at least ${minLen} character(s) long!`);
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {ValidatorsOptions} options
 */
const objectIdValidator = (location, fieldName, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .custom((value) => {
            try {
                if (!isValidObjectId(value)) {
                    throw new Error(`The '${fieldName}' field is not a valid ObjectId!`);
                }
            } catch (error) {
                throw error;
            }

            return true;
        });
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {ValidatorsOptions} options
 */
const numericFieldValidator = (location, fieldName, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .isNumeric({ no_symbols: true })
        .withMessage(`The '${fieldName}' field should contain numbers only!`);
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {number} min
 * @param {ValidatorsOptions} options
 */
const minIntFieldValidator = (location, fieldName, min, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .isInt({ min })
        .withMessage(`The '${fieldName}' field should be minimum ${min}!`);
};

/**
 * @param {ValidationLocation} location
 * @param {string} fieldName
 * @param {number} max
 * @param {ValidatorsOptions} options
 */
const maxIntFieldValidator = (location, fieldName, max, options) => {
    return location(fieldName)
        .customSanitizer(toNullable)
        .if((value) => allowChecking(value, options?.optional))
        .isInt({ max })
        .withMessage(`The '${fieldName}' field should be maximum ${max}!`);
};

module.exports = {
    requiredFieldValidator,
    stringFieldValidator,
    minLenFieldValidator,
    objectIdValidator,
    numericFieldValidator,
    minIntFieldValidator,
    maxIntFieldValidator,
};
