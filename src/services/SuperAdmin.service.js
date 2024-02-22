const ResponseError = require('../models/ResponseError');
const UserService = require('./User.service');
const { SuperAdmin } = require('../schemas/superAdmin.schema');
const CacheUtils = require('../utils/cache.utils');

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

            let admin = await new SuperAdmin(data).save();

            admin = {
                ...admin.toJSON(),
                password: undefined,
            };

            await CacheUtils.putArrayAsDictItem('super-admins', admin._id.toString(), admin);

            return admin;
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

            let admin = await SuperAdmin.findOneAndUpdate({ _id: id }, data, { new: true })
                .select('-password')
                .exec();

            admin = admin?.toJSON() || null;

            if (admin) {
                await CacheUtils.putArrayAsDictItem('super-admins', admin._id.toString(), admin);
            }

            return admin;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {Array<TObjectId>} excludedIds
     */
    static async fetchAll(excludedIds = []) {
        try {
            const admins = await CacheUtils.cacheArrayAsDict(
                'super-admins',
                async () => {
                    return await SuperAdmin.find().select('-password').exec();
                },
                (admin) => admin._id?.toString()
            );

            const excludedIdsSet = new Set(excludedIds);

            return admins.filter((admin) => !excludedIdsSet.has(admin._id));
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

            if (admin) {
                await CacheUtils.putArrayAsDictItem('super-admins', admin._id.toString(), undefined);
            }

            return admin?.toJSON() || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SuperAdminService;
