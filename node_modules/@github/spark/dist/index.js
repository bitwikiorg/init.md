import { useState, useMemo, useCallback, useEffect } from 'react';
import { K as KVClient, a as KvEventType } from './kv-WMiiBMWU.js';

/**
 * A hook that works similarly to React.useState, but persists the value using the Spark Runtime.
 * The value is automatically retrieved from the Spark Runtime on mount and updated on state change.
 * While the initial value is being fetched, the `initialValue` is being used.
 * Use this component when you need to persist/store/remember values. Note that the current value
 * may be undefined if no value has been set yet or if the value has been deleted.
 *
 * @param key - The key under which to store the value.
 * @param initialValue - The initial value to use if no stored value is found.
 * @returns An array containing the current value, a setter function, and a delete function.
 *
 * @example
 * import { useKV } from "@github/spark/hooks";
 *
 * const [count, setCount, deleteCount] = useKV("count", 0);
 * @example
 * import { useKV } from "@github/spark/hooks";
 *
 * const [name, setName] = useKV("name", "");
 */
function useKV(key, initialValue) {
    const [value, setValue] = useState(initialValue);
    const kvClient = useMemo(() => {
        return new KVClient();
    }, []);
    const handleMessage = useCallback(async (event) => {
        switch (event.data.type) {
            case KvEventType.SPARK_KV_DELETED:
                // When we're notified from Workbench that a key has been deleted,
                // let's erase our understanding of the value.
                if (event.data.payload.key === key) {
                    setValue(undefined);
                }
                return;
            case KvEventType.SPARK_KV_UPDATED:
                // When we're notified from Workbench that a key has been updated,
                // let's go grab the new value from the database directly.
                if (event.data.payload.key === key) {
                    setValue(await kvClient.getKey(key));
                }
                return;
        }
    }, [key]);
    useEffect(() => {
        if (!import.meta.env.DEV) {
            return;
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [key, handleMessage]);
    useEffect(() => {
        async function getOrSetKey() {
            setValue(await kvClient.getOrSetKey(key, initialValue));
        }
        getOrSetKey();
    }, [kvClient]);
    const deleteValue = useCallback(() => {
        kvClient.deleteKey(key);
        setValue(undefined);
    }, [key]);
    const userSetValue = useCallback((newValue) => {
        setValue((currentValue) => {
            const nextValue = typeof newValue === 'function'
                ? newValue(currentValue)
                : newValue;
            kvClient.setKey(key, nextValue);
            return nextValue;
        });
    }, [key, kvClient]);
    return [value, userSetValue, deleteValue];
}

export { useKV };
//# sourceMappingURL=index.js.map
