const express = require('express');

const authRouter = require('./auth.routes');
const superAdminRouter = require('./superAdmin.routes');
const schoolAdminRouter = require('./schoolAdmin.routes');
const schoolRouter = require('./school.routes');
const studentRouter = require('./student.routes');
const classroomRouter = require('./classroom.routes');
const tokenChecker = require('../middlewares/tokenChecker.mw');
const userTypeChecker = require('../middlewares/userTypeChecker.mw');
const managedSchoolChecker = require('../middlewares/managedSchoolChecker.mw');

const appRouter = express.Router();

appRouter.use('/auth', authRouter);

appRouter.use(
    '/super-admin',
    tokenChecker(),
    userTypeChecker({ allowedUsers: ['SuperAdmin'] }),
    superAdminRouter
);

appRouter.use(
    '/school-admin',
    tokenChecker(),
    userTypeChecker({ allowedUsers: ['SuperAdmin'] }),
    schoolAdminRouter
);

appRouter.use('/school', tokenChecker(), userTypeChecker({ allowedUsers: ['SuperAdmin'] }), schoolRouter);

appRouter.use(
    '/student',
    tokenChecker(),
    userTypeChecker({ allowedUsers: ['SchoolAdmin'] }),
    managedSchoolChecker(),
    studentRouter
);

appRouter.use(
    '/classroom',
    tokenChecker(),
    userTypeChecker({ allowedUsers: ['SchoolAdmin'] }),
    managedSchoolChecker(),
    classroomRouter
);

module.exports = appRouter;
