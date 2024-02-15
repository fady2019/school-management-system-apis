const { Schema, SchemaTypes, model } = require('mongoose');

const { Classroom } = require('./classroom.schema');
const { Student } = require('./student.schema');
const { SchoolAdmin } = require('./schoolAdmin.schema');

const SchoolSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
        },
        creatorId: {
            type: SchemaTypes.ObjectId,
            ref: 'SuperAdmin',
            required: true,
        },
    },
    { timestamps: true }
);

SchoolSchema.pre('save', async function (next) {
    try {
        const SuperAdminService = require('../services/SuperAdmin.service');
        await SuperAdminService.shouldExist(this.creatorId);
        next();
    } catch (error) {
        next(error);
    }
});

SchoolSchema.pre('findOneAndDelete', async function (next) {
    try {
        const schoolId = this.getQuery()._id;

        const classrooms = await Classroom.find({ schoolId });

        for (const classroom of classrooms) {
            await classroom.deleteOne();
        }

        await Student.deleteMany({ schoolId });
        await SchoolAdmin.updateMany({ managedSchoolId: schoolId }, { managedSchoolId: null });

        next();
    } catch (error) {
        next(error);
    }
});

const School = model('School', SchoolSchema);

module.exports = {
    SchoolSchema,
    School,
};
