const { Schema, SchemaTypes, model } = require('mongoose');

const { Student } = require('./student.schema');

const ClassroomSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
        },
        schoolId: {
            type: SchemaTypes.ObjectId,
            ref: 'School',
            required: true,
            immutable: true,
        },
        creatorId: {
            type: SchemaTypes.ObjectId,
            ref: 'SchoolAdmin',
            required: true,
        },
    },
    { timestamps: true }
);

ClassroomSchema.pre('save', async function (next) {
    try {
        const SchoolAdminService = require('../services/SchoolAdmin.service');
        await SchoolAdminService.shouldExist(this.creatorId);
        next();
    } catch (error) {
        next(error);
    }
});

ClassroomSchema.pre('save', async function (next) {
    try {
        const SchoolService = require('../services/School.service');
        await SchoolService.shouldExist(this.schoolId);
        next();
    } catch (error) {
        next(error);
    }
});

ClassroomSchema.pre('findOneAndDelete', async function (next) {
    try {
        const classroomId = this.getQuery()._id;

        await Student.updateMany({ classroomId }, { classroomId: null }).exec();
    } catch (error) {
        next(error);
    }
});

const Classroom = model('Classroom', ClassroomSchema);

module.exports = {
    ClassroomSchema,
    Classroom,
};
