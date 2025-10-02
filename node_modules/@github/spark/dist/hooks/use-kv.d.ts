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
export declare function useKV<T = string>(key: string, initialValue?: NoInfer<T>): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void];
