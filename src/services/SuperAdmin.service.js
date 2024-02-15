const ResponseError = require('../models/ResponseError');
const UserService = require('./User.service');
const { SuperAdmin } = require('../schemas/superAdmin.schema');

require('../jsDocs/globalDefinitions');

class SuperAdminService {
    /**
     * @param {TObjectId} superAdminId the id of the target super-admin
     * @throws an error if the super-admin with the entered id not exists
     */
    static async shouldExist(superAdminId) {
        try {
            if (!superAdminId) {
                return;
            }

            const superAdmin = await SuperAdmin.exists({ _id: superAdminId }).exec();

            if (!superAdmin) {
                throw new ResponseError("There's no super-admin with the entered id!", 404);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TSuperAdminSchema} data
     * @throws an error if the username is not unique
     */
    static async createSuperAdmin(data) {
        try {
            await UserService.shouldBeUniqueUsername(data.username);

            const admin = await new SuperAdmin(data).save();

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
     * @param {TSuperAdminSchema} data
     * @throws an error if the new username is not unique
     */
    static async updateSuperAdmin(id, data) {
        try {
            if (!!data.username) {
                await UserService.shouldBeUniqueUsername(data.username, [id]);
            }

            const admin = await SuperAdmin.findOneAndUpdate({ _id: id }, data, { new: true })
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
            const admins = await SuperAdmin.find({ _id: { $nin: excludedIds } })
                .select('-password')
                .exec();

            return admins;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {TObjectId} superAdminId
     */
    static async deleteSuperAdmin(superAdminId) {
        try {
            const admin = await SuperAdmin.findOneAndDelete({ _id: superAdminId }).select('-password').exec();

            return admin?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SuperAdminService;
