const dotenv = require('dotenv');
dotenv.config();

const { connectToDB } = require('./connection/db');
const Cache = require('./connection/cache');
const ExpressAppSingleton = require('./models/ExpressAppSingleton');
const ResponseError = require('./models/ResponseError');
const appRouter = require('./routes/app.routes');

const { initSwaggerDocs } = require('./jsDocs/swagger/swaggerConfig');

const init = async () => {
    const expressApp = ExpressAppSingleton.createInstance().expressApp;

    expressApp.use('/api', appRouter);

    initSwaggerDocs(expressApp);

    expressApp.use((req, _res, _next) => {
        throw new ResponseError(
            `sorry, it seems that the URL '${req.method}: ${req.url}' is not provided!`,
            404
        );
    });

    expressApp.use((error, _req, res, _next) => {
        const message = error.message || 'an unknown error have been occurred!';
        const statusCode = error.statusCode || 500;
        const extraData = error.extraData;

        res.status(statusCode).json({
            message,
            extraData,
        });
    });

    await connectToDB();
    await Cache.init();

    expressApp.listen(8000, () => {
        console.log('Server is Running');
    });
};

init();
