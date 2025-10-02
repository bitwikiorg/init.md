import { PluginOption } from 'vite';
interface SparkPluginOptions {
    serverURL?: string;
    agentDisabled?: boolean;
    projectRoot?: string;
    outputDir?: string;
    githubRuntimeName?: string;
    githubApiUrl?: string;
    port?: number;
    corsOrigin?: RegExp;
    hmrOverlay?: boolean;
    logLevel?: 'info' | 'warn' | 'error' | 'silent';
}
export default function sparkVitePlugin(opts?: SparkPluginOptions): PluginOption[];
export {};
