declare global {
    interface Window {
        sourceMap?: {
            SourceMapConsumer: {
                new (sourceMap: any): any;
                initialize(config: {
                    [key: string]: string;
                }): void;
            };
        };
    }
}
export declare function setupErrorListener(): void;
