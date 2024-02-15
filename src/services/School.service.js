const ResponseError = require('../models/ResponseError');
const { School, SchoolSchema } = require('../schemas/school.schema');

require('../jsDocs/globalDefinitions');

class SchoolService {
    /**
     * @param {TObjectId} schoolId the id of the target school
     * @throws an error if the school with the entered id not exists
     */
    static async shouldExist(schoolId) {
        try {
            if (!schoolId) {
                return;
            }

            const school = await School.exists({ _id: schoolId }).exec();

            if (!school) {
                throw new ResponseError("There's no school with the entered id!", 404);
            }
        } catch (error) {
            throw error;
        }
    }

    static async fetchAll() {
        try {
            const schools = await School.find().exec();

            return schools;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     */
    static async fetchById(schoolId) {
        try {
            const school = await School.findOne({ _id: schoolId });

            return school?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TSchoolSchema} data
     */
    static async createSchool(data) {
        try {
            const school = await new School(data).save();

            return school.toJSON();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     * @param {TSchoolSchema} data
     */
    static async updateSchool(schoolId, data) {
        try {
            const school = await School.findOneAndUpdate({ _id: schoolId }, data, { new: true }).exec();

            return school?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolId
     */
    static async deleteSchool(schoolId) {
        try {
            const school = await School.findOneAndDelete({ _id: schoolId }).exec();

            return school?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SchoolService;
