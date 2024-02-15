const { Schema, SchemaTypes } = require('mongoose');

const { User } = require('./user.schema');
const { Classroom } = require('./classroom.schema');
const { Student } = require('./student.schema');

require('../jsDocs/globalDefinitions');

const SchoolAdminSchema = new Schema({
    creatorId: {
        type: SchemaTypes.ObjectId,
        ref: 'SuperAdmin',
        required: true,
    },
    managedSchoolId: {
        type: SchemaTypes.ObjectId,
        ref: 'School',
    },
});

SchoolAdminSchema.pre('save', async function (next) {
    try {
        const SuperAdminService = require('../services/SuperAdmin.service');
        await SuperAdminService.shouldExist(this.creatorId);
        next();
    } catch (error) {
        next(error);
    }
});

SchoolAdminSchema.pre('save', async function (next) {
    try {
        const SchoolService = require('../services/School.service');
        await SchoolService.shouldExist(this.managedSchoolId);
        next();
    } catch (error) {
        next(error);
    }
});

SchoolAdminSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const managedSchoolId = this.getUpdate()?.managedSchoolId;

        const SchoolService = require('../services/School.service');
        await SchoolService.shouldExist(managedSchoolId);
        next();
    } catch (error) {
        next(error);
    }
});

SchoolAdminSchema.pre('findOneAndDelete', async function (next) {
    try {
        const schoolAdminId = this.getQuery()._id;

        await Classroom.updateMany({ creatorId: schoolAdminId }, { creatorId: null }).exec();
        await Student.updateMany({ creatorId: schoolAdminId }, { creatorId: null }).exec();
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * @type {TSchoolAdminModel}
 */
const SchoolAdmin = User.discriminator('SchoolAdmin', SchoolAdminSchema);

module.exports = {
    SchoolAdminSchema,
    SchoolAdmin,
};
