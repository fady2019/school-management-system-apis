const ResponseError = require('../models/ResponseError');
const UserService = require('./User.service');
const { SchoolAdmin } = require('../schemas/schoolAdmin.schema');

require('../jsDocs/globalDefinitions');

class SchoolAdminService {
    /**
     * @param {TObjectId} schoolAdminId the id of the target school-admin
     * @throws an error if the school-admin with the entered id not exists
     */
    static async shouldExist(schoolAdminId) {
        try {
            if (!schoolAdminId) {
                return;
            }

            const schoolAdmin = await SchoolAdmin.exists({ _id: schoolAdminId }).exec();

            if (!schoolAdmin) {
                throw new ResponseError("There's no school-admin with the entered id!", 404);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TSchoolAdminSchema} data
     * @throws an error if the username is not unique
     */
    static async createSchoolAdmin(data) {
        try {
            await UserService.shouldBeUniqueUsername(data.username);

            const admin = await new SchoolAdmin({
                managedSchoolId: null,
                ...data,
            }).save();

            return {
                ...admin.toJSON(),
                password: undefined,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} id
     * @param {TSchoolAdminSchema} data
     * @throws an error if the new username is not unique
     */
    static async updateSchoolAdmin(id, data) {
        try {
            if (!!data.username) {
                await UserService.shouldBeUniqueUsername(data.username, [id]);
            }

            const admin = await SchoolAdmin.findOneAndUpdate({ _id: id }, data, { new: true })
                .select('-password')
                .exec();

            return admin?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {Array<TObjectId>} excludedIds
     */
    static async fetchAll(excludedIds = []) {
        try {
            const admins = await SchoolAdmin.find({ _id: { $nin: excludedIds } })
                .select('-password')
                .exec();

            return admins;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} schoolAdminId
     */
    static async deleteSchoolAdmin(schoolAdminId) {
        try {
            const admin = await SchoolAdmin.findOneAndDelete({ _id: schoolAdminId })
                .select('-password')
                .exec();

            return admin?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SchoolAdminService;
