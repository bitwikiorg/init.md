import { llm, llmPrompt } from './llm';
import { fetchUser } from './user';
declare global {
    interface Window {
        spark: {
            llmPrompt: typeof llmPrompt;
            llm: typeof llm;
            user: typeof fetchUser;
            kv: typeof kv;
        };
    }
}
declare const kv: {
    keys: () => Promise<string[]>;
    get: <T>(key: string) => Promise<T | undefined>;
    set: <T>(key: string, value: T) => Promise<void>;
    delete: (key: string) => Promise<void>;
};
export {};
