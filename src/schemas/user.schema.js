const { Schema, SchemaTypes, model } = require('mongoose');

const PasswordUtils = require('../utils/password.utils');

const UserSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
        },
        username: {
            type: SchemaTypes.String,
            required: true,
            unique: true,
        },
        password: {
            type: SchemaTypes.String,
            required: true,
        },
    },
    { timestamps: true, discriminatorKey: 'userType' }
);

UserSchema.pre('save', async function (next) {
    try {
        this.password = await PasswordUtils.hashPassword(this.password);
    } catch (error) {
        next(error);
    }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const password = this.getUpdate()?.password;

        if (!password) {
            return;
        }

        this.setUpdate({
            password: await PasswordUtils.hashPassword(password),
        });
    } catch (error) {
        next(error);
    }
});

const User = model('User', UserSchema);

module.exports = {
    UserSchema,
    User,
};
