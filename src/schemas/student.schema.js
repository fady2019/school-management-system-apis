const { Schema, SchemaTypes } = require('mongoose');

const { User } = require('./user.schema');

require('../jsDocs/globalDefinitions');

const StudentSchema = new Schema({
    level: {
        type: SchemaTypes.Number,
        required: true,
        min: 1,
        max: 18,
    },
    schoolId: {
        type: SchemaTypes.ObjectId,
        ref: 'School',
        required: true,
        immutable: true,
    },
    classroomId: {
        type: SchemaTypes.ObjectId,
        ref: 'Classroom',
    },
    creatorId: {
        type: SchemaTypes.ObjectId,
        ref: 'SchoolAdmin',
        required: true,
    },
});

StudentSchema.pre('save', async function (next) {
    try {
        const SchoolAdminService = require('../services/SchoolAdmin.service');
        await SchoolAdminService.shouldExist(this.creatorId);
        next();
    } catch (error) {
        next(error);
    }
});

StudentSchema.pre('save', async function (next) {
    try {
        const ClassroomService = require('../services/Classroom.service');
        await ClassroomService.shouldExist(this.schoolId, this.classroomId);
        next();
    } catch (error) {
        next(error);
    }
});

StudentSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const schoolId = this.getQuery()?.schoolId;
        const classroomId = this.getUpdate()?.classroomId;

        const ClassroomService = require('../services/Classroom.service');
        await ClassroomService.shouldExist(schoolId, classroomId);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * @type {TStudentModel}
 */
const Student = User.discriminator('Student', StudentSchema);

module.exports = {
    StudentSchema,
    Student,
};
