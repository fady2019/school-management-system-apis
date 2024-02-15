const { Student } = require('../schemas/student.schema');
const UserService = require('./User.service');

require('../jsDocs/globalDefinitions');

class StudentService {
    /**
     * @param {TStudentSchema} data
     * @throws an error if the username is not unique
     */
    static async createStudent(data) {
        try {
            await UserService.shouldBeUniqueUsername(data.username);

            const student = await new Student({
                classroomId: null,
                ...data,
            }).save();

            return {
                ...student.toJSON(),
                password: undefined,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} studentId
     * @param {TStudentSchema} data
     * @throws an error if the new username is not unique
     */
    static async updateStudent(schoolId, studentId, data) {
        try {
            if (!!data.username) {
                await UserService.shouldBeUniqueUsername(data.username, [studentId]);
            }

            const student = await Student.findOneAndUpdate({ _id: studentId, schoolId }, data, { new: true })
                .select('-password')
                .exec();

            return student?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {{ classroomId?: TObjectId, level?: number }} filters
     */
    static async fetchAll(schoolId, filters) {
        try {
            for (const key in filters) {
                if (filters[key] === undefined) {
                    delete filters[key];
                }
            }

            const students = await Student.find({ schoolId, ...filters })
                .select('-password')
                .exec();

            return students;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} studentId
     */
    static async fetchById(schoolId, studentId) {
        try {
            const student = await Student.findOne({ _id: studentId, schoolId }).select('-password').exec();

            return student?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TObjectId} studentId
     */
    static async deleteStudent(schoolId, studentId) {
        try {
            const student = await Student.findOneAndDelete({ _id: studentId, schoolId })
                .select('-password')
                .exec();

            return student?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StudentService;
