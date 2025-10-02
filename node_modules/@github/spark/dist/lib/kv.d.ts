export declare class KVClient {
    /**
    * Retrieves a list of all keys in the KV store.
    * @returns A list of all keys in the KV store, or an empty array if there are no keys.
    */
    getKeys(): Promise<string[]>;
    /**
     * Retrieves all key-value pairs from the KV store.
     * @returns An object containing all key-value pairs, or an empty object if there are no keys.
     *
     * TODO: replace with batch request
     */
    getAll(): Promise<Record<string, any>>;
    /**
     * Retrieves the value associated with the given key from the KV store.
     * @param key The key to retrieve.
     * @returns The value associated with the key, or undefined if not found.
     */
    getKey<T>(key: string): Promise<T | undefined>;
    /**
     * Retrieves the value associated with the given key from the KV store, while also setting it if it does not exist.
     * @param key The key to retrieve.
     * @param value The value to set if the key does not exist.
     * @returns The value associated with the key, whether it was retrieved or newly set.
     */
    getOrSetKey<T>(key: string, value: T): Promise<T | undefined>;
    /**
     * Sets the value for the given key in the KV store.
     * @param key The key to set.
     * @param value The value to associate with the key.
     * @returns A promise that resolves when the operation is complete.
     */
    setKey<T>(key: string, value: T): Promise<void>;
    /**
     * Deletes the value associated with the given key from the KV store.
     * @param key The key to delete from the KV store.
     */
    deleteKey(key: string): Promise<void>;
}
