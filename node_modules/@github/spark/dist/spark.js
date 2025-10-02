import { E as EventType } from './heartbeat-event-types-BmKuwNhb.js';
import { K as KVClient } from './kv-WMiiBMWU.js';
import { llm, llmPrompt } from './llm.js';

let cachedUser = null;
async function fetchUser() {
    try {
        if (cachedUser) {
            return cachedUser;
        }
        const response = await fetch('/_spark/user');
        cachedUser = await response.json();
        return cachedUser;
    }
    catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

const payload = {
    url: window?.location?.href,
    load_ms: window?.performance?.now(),
};
window.parent.postMessage({
    type: EventType.SPARK_RUNTIME_LOADED,
    payload,
}, '*');
fetch('/_spark/loaded', {
    method: 'POST',
    headers: {
        'Content-Type': `application/json`,
    },
    body: JSON.stringify(payload),
});
const kv = {
    keys: async () => {
        const client = new KVClient();
        return client.getKeys();
    },
    get: async (key) => {
        const client = new KVClient();
        return client.getKey(key);
    },
    set: async (key, value) => {
        const client = new KVClient();
        return client.setKey(key, value);
    },
    delete: async (key) => {
        const client = new KVClient();
        return client.deleteKey(key);
    },
};
window.spark = {
    llmPrompt,
    llm,
    user: fetchUser,
    kv,
};
//# sourceMappingURL=spark.js.map
