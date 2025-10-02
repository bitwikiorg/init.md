import { PluginOption } from 'vite';
interface Opts {
    serverURL?: string;
    disabled?: boolean;
    maxRetries?: number;
    retryDelay?: number;
}
export default function sparkAgent(opts?: Opts): PluginOption;
export {};
