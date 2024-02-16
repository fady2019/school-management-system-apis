const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { version } = require('../../../package.json');

/**
 * @type {import('swagger-jsdoc').Options}
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management System APIs',
            description: 'School Management System APIs',
            version,
            contact: {
                name: 'Fady Emad',
                email: 'f.emad258456@gmail.com',
            },
        },
        tags: [
            { name: 'Authentication', description: 'Any user can access these endpoints!' },
            { name: 'Super Admins', description: 'Only Super Admins can assess these endpoints!' },
            { name: 'School Admins', description: 'Not Done Yet!' },
            { name: 'Schools', description: 'Not Done Yet!' },
            { name: 'Students', description: 'Not Done Yet!' },
            { name: 'Classrooms', description: 'Not Done Yet!' },
        ],
    },
    apis: ['./src/routes/*.routes.js', './src/jsDocs/swagger/schemas/*.schema.js'],
};

/**
 * @param {ExpressApp} expressApp
 */
const initSwaggerDocs = (expressApp) => {
    expressApp.use(
        '/api-docs',
        swaggerUI.serve,
        swaggerUI.setup(swaggerJSDoc(swaggerOptions), {
            customSiteTitle: 'School Management System APIs Docs',
        })
    );
};

module.exports = {
    initSwaggerDocs,
};
