const { Schema, SchemaTypes } = require('mongoose');

const { User } = require('./user.schema');
const { SchoolAdmin } = require('./schoolAdmin.schema');
const { School } = require('./school.schema');

require('../jsDocs/globalDefinitions');

const SuperAdminSchema = new Schema({
    creatorId: {
        type: SchemaTypes.ObjectId,
        ref: 'SuperAdmin',
        required: true,
    },
});

SuperAdminSchema.pre('save', async function (next) {
    try {
        const SuperAdminService = require('../services/SuperAdmin.service');
        await SuperAdminService.shouldExist(this.creatorId);
        next();
    } catch (error) {
        next(error);
    }
});

SuperAdminSchema.pre('findOneAndDelete', async function (next) {
    try {
        const superAdminId = this.getQuery()._id;

        await SuperAdmin.updateMany({ creatorId: superAdminId }, { creatorId: null }).exec();
        await SchoolAdmin.updateMany({ creatorId: superAdminId }, { creatorId: null }).exec();
        await School.updateMany({ creatorId: superAdminId }, { creatorId: null }).exec();
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * @type {TSuperAdminModel}
 */
const SuperAdmin = User.discriminator('SuperAdmin', SuperAdminSchema, { immutable: true });

module.exports = {
    SuperAdminSchema,
    SuperAdmin,
};
