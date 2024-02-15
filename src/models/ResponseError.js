class ResponseError extends Error {
    #message;
    #statusCode;
    #extraData;

    /**
     * @param {string} message
     * @param {number} statusCode
     * @param {any} extraData
     */
    constructor(message, statusCode, extraData = undefined) {
        super(message);
        this.#message = message;
        this.#statusCode = statusCode;
        this.#extraData = extraData;
    }

    get message() {
        return this.#message;
    }

    get statusCode() {
        return this.#statusCode;
    }

    get extraData() {
        return this.#extraData;
    }

    reformat() {
        return {
            message: this.#message,
            statusCode: this.#statusCode,
            extraData: this.#extraData,
        };
    }
}

module.exports = ResponseError;
