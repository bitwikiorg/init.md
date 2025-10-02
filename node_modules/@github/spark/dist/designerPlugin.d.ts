import { PluginOption } from 'vite';
export default function getCwd(): string;
export declare function tagFile(source: string, filePath: string): {
    code: string;
    map: any;
};
export declare const tagSourcePlugin: () => PluginOption;
export declare const designerHost: () => PluginOption;
