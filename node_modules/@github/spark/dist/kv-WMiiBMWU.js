const KvEventType = {
    SPARK_KV_UPDATED: 'sparkKvUpdated',
    SPARK_KV_DELETED: 'sparkKvDeleted',
};

// This function allows us to send messages from the Spark back to the Workbench application.
// Specifically, we want to send updates about KV operations, to allow the Workbench
// to update its UI accordingly.
const sendEventToWorkbench = (message) => {
    if (import.meta.env.DEV) {
        window.parent.postMessage(message, '*');
    }
};
class KVClient {
    /**
    * Retrieves a list of all keys in the KV store.
    * @returns A list of all keys in the KV store, or an empty array if there are no keys.
    */
    async getKeys() {
        // Fetching the root URL will return all keys in the KV store.
        const response = await fetch(BASE_KV_SERVICE_URL, {
            method: 'GET',
        });
        if (!response.ok) {
            const errorMessage = `Failed to fetch KV keys: ${response.statusText}`;
            return Promise.reject(new Error(errorMessage));
        }
        let json;
        try {
            json = await response.json();
        }
        catch (error) {
            const errorMessage = 'Failed to parse KV keys response';
            return Promise.reject(new Error(errorMessage));
        }
        if (!Array.isArray(json)) {
            const errorMessage = 'KV keys response is not an array';
            return Promise.reject(new Error(errorMessage));
        }
        return json;
    }
    /**
     * Retrieves all key-value pairs from the KV store.
     * @returns An object containing all key-value pairs, or an empty object if there are no keys.
     *
     * TODO: replace with batch request
     */
    async getAll() {
        const keys = await this.getKeys();
        const result = {};
        // Fetch all values concurrently
        const values = await Promise.all(keys.map(key => this.getKey(key)));
        // Build the result object
        keys.forEach((key, index) => {
            const value = values[index];
            if (value !== undefined) {
                result[key] = value;
            }
        });
        return result;
    }
    /**
     * Retrieves the value associated with the given key from the KV store.
     * @param key The key to retrieve.
     * @returns The value associated with the key, or undefined if not found.
     */
    async getKey(key) {
        const response = await fetch(`${BASE_KV_SERVICE_URL}/${encodeURIComponent(key)}`, {
            method: 'GET',
            headers: {
                'Content-Type': `text/plain`,
            },
        });
        if (!response.ok) {
            const errorMessage = `Failed to fetch KV key: ${response.statusText}`;
            if (response.status === 404) {
                // If the key does not exist, return undefined
                return undefined;
            }
            // For other errors, reject with an error message
            return Promise.reject(new Error(errorMessage));
        }
        const responseText = await response.text();
        // Extract the value from the response text.
        // Important to remember that even a simple string should be returned to us as a JSON-encoded value,
        // meaning that the parse should succeed.
        try {
            return JSON.parse(responseText);
        }
        catch (error) {
            const errorMessage = `Failed to parse KV key response`;
            return Promise.reject(new Error(errorMessage));
        }
    }
    /**
     * Retrieves the value associated with the given key from the KV store, while also setting it if it does not exist.
     * @param key The key to retrieve.
     * @param value The value to set if the key does not exist.
     * @returns The value associated with the key, whether it was retrieved or newly set.
     */
    async getOrSetKey(key, value) {
        const existingValue = await this.getKey(key);
        if (existingValue !== undefined) {
            return existingValue;
        }
        const response = await fetch(`${BASE_KV_SERVICE_URL}/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
                'Content-Type': `text/plain`,
                'X-Spark-Initial': 'true',
            },
            body: JSON.stringify(value),
        });
        if (!response.ok) {
            const errorMessage = `Failed to set default value for key: ${response.statusText}`;
            return Promise.reject(new Error(errorMessage));
        }
        sendEventToWorkbench({
            type: KvEventType.SPARK_KV_UPDATED,
            payload: { key },
        });
        return value;
    }
    /**
     * Sets the value for the given key in the KV store.
     * @param key The key to set.
     * @param value The value to associate with the key.
     * @returns A promise that resolves when the operation is complete.
     */
    async setKey(key, value) {
        const response = await fetch(`${BASE_KV_SERVICE_URL}/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
                'Content-Type': `text/plain`,
                'X-Spark-Initial': 'false',
            },
            body: JSON.stringify(value),
        });
        if (!response.ok) {
            const errorMessage = `Failed to set key: ${response.statusText}`;
            return Promise.reject(new Error(errorMessage));
        }
        sendEventToWorkbench({
            type: KvEventType.SPARK_KV_UPDATED,
            payload: { key, value: JSON.stringify(value) },
        });
    }
    /**
     * Deletes the value associated with the given key from the KV store.
     * @param key The key to delete from the KV store.
     */
    async deleteKey(key) {
        await fetch(`${BASE_KV_SERVICE_URL}/${encodeURIComponent(key)}`, { method: 'DELETE' });
        sendEventToWorkbench({
            type: KvEventType.SPARK_KV_DELETED,
            payload: { key },
        });
    }
}

export { KVClient as K, KvEventType as a };
//# sourceMappingURL=kv-WMiiBMWU.js.map
