const ResponseError = require('../models/ResponseError');
const { Classroom } = require('../schemas/classroom.schema');

require('../jsDocs/globalDefinitions');

class ClassroomService {
    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} classroomId the id of the target classroom
     * @throws an error if the classroom with the entered id not exists
     */
    static async shouldExist(schoolId, classroomId) {
        try {
            if (!schoolId || !classroomId) {
                return;
            }

            const classroom = await Classroom.exists({ _id: classroomId, schoolId }).exec();

            if (!classroom) {
                throw new ResponseError('The target school has no classroom with the entered id!', 404);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     */
    static async fetchAll(schoolId) {
        try {
            const classrooms = await Classroom.find({ schoolId }).exec();

            return classrooms;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} classroomId
     */
    static async fetchById(schoolId, classroomId) {
        try {
            const classroom = await Classroom.findOne({ _id: classroomId, schoolId }).exec();

            return classroom?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TClassroomSchema} data
     */
    static async createClassroom(data) {
        try {
            const classroom = await new Classroom(data).save();

            return classroom.toJSON();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} classroomId
     * @param {TClassroomSchema} data
     */
    static async updateClassroom(schoolId, classroomId, data) {
        try {
            const classroom = await Classroom.findOneAndUpdate({ _id: classroomId, schoolId }, data, {
                new: true,
            }).exec();

            return classroom?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} classroomId
     */
    static async deleteClassroom(schoolId, classroomId) {
        try {
            const classroom = await Classroom.findOneAndDelete({ _id: classroomId, schoolId }).exec();

            return classroom?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClassroomService;
