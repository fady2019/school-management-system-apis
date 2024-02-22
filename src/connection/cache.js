const redis = require('redis');

class Cache {
    /**
     * @type { ReturnType<redis.createClient> | null }
     */
    static #cacheClient = null;

    /**
     * Initialize the cache
     */
    static async init() {
        if (this.#cacheClient !== null) {
            return;
        }

        this.#cacheClient = redis.createClient({
            url: process.env.REDIS_URL,
        });

        try {
            await Cache.#cacheClient.connect();
            console.log('Initialize Redis');
        } catch (error) {
            throw error;
        }
    }

    static get cacheClient() {
        if (this.#cacheClient === null) {
            throw new Error('Make sure to initialize the cache first!');
        }

        return this.#cacheClient;
    }
}

module.exports = Cache;
