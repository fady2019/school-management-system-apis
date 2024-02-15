const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('../jsDocs/globalDefinitions');

module.exports = class ExpressAppSingleton {
    static #allowConstruction = false;
    /**
     * @type {ExpressAppSingleton | null}
     */
    static #instance = null;
    /**
     * @type {ExpressApp | null}
     */
    #expressApp = null;

    static createInstance() {
        if (this.#instance) {
            return this.#instance;
        }

        this.#allowConstruction = true;
        this.#instance = new ExpressAppSingleton();
        this.#allowConstruction = false;

        return this.#instance;
    }

    constructor() {
        if (!ExpressAppSingleton.#allowConstruction) {
            throw new Error("can't call the construction!");
        }

        // initialize the express app
        this.#expressApp = express();
        this.#expressApp.use(bodyParser.json());
        this.#expressApp.use(cookieParser());
        this.#expressApp.use(
            cors({
                credentials: true,
                origin(reqOrigin, cb) {
                    reqOrigin = reqOrigin?.toLowerCase();

                    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
                        .split(',')
                        .map((o) => o.trim().toLowerCase());

                    const allowAll = allowedOrigins.length === 0 || allowedOrigins.includes('*');

                    if (!reqOrigin || allowAll || allowedOrigins.includes(reqOrigin)) {
                        return cb(null, true);
                    }

                    return cb(new Error('not allowed origin!'), false);
                },
            })
        );
    }

    get expressApp() {
        return this.#expressApp;
    }
};
