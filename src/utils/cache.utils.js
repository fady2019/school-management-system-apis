const Cache = require('../connection/cache');

class CacheUtils {
    /**
     * @param {string} key the key of the cached value
     * @param {() => Promise<any>} callback the function that runs in case of cache miss
     * @param {number} expirationDuration the duration in seconds to remove the cached value from the cache
     */
    static async cacheString(key, callback, expirationDuration = 3600) {
        const K = `STRING__${key}`;

        const exists = await Cache.cacheClient.exists(K);

        if (exists === 0) {
            const dataAsString = JSON.stringify(await callback());
            await Cache.cacheClient.setEx(K, expirationDuration, dataAsString);
        }

        return JSON.parse(await Cache.cacheClient.get(K));
    }

    /**
     * @param {string} key the key of the cached value
     * @param {() => Promise<any>} callback the function that runs in case of cache miss
     * @param {(item: any) => string | number} getItemKey the function that returns the field that will be used as a key
     * @param {number} expirationDuration the duration in seconds to remove the cached value from the cache
     */
    static async cacheArrayAsDict(key, callback, getItemKey, expirationDuration = 3600) {
        const K = `ARRAY_AS_DICT__${key}`;

        const exists = await Cache.cacheClient.exists(K);

        if (exists === 0) {
            const dataAsArray = await callback();

            for (const item of dataAsArray) {
                await this.putArrayAsDictItem(key, getItemKey(item), item);
            }

            await Cache.cacheClient.expire(K, expirationDuration);
        }

        const dict = await Cache.cacheClient.hGetAll(K);

        return Object.values(dict).map((item) => JSON.parse(item));
    }

    /**
     * @param {string} key the dict name
     * @param {string} field the key of the item
     * @param {Object | undefined} item the item to cache, if the item is "undefined" the row with key "field" will be deleted
     */
    static async putArrayAsDictItem(key, field, item) {
        if (item === undefined) {
            await Cache.cacheClient.hDel(`ARRAY_AS_DICT__${key}`, field);
        } else {
            await Cache.cacheClient.hSet(`ARRAY_AS_DICT__${key}`, field, JSON.stringify(item));
        }
    }
}

module.exports = CacheUtils;
