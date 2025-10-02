import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const src = require.resolve('./heartbeat');
const heartbeatPlugin = () => {
    return {
        name: 'heartbeat',
        apply: 'serve', // Only apply this plugin for the dev server only
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: 'script',
                        attrs: {
                            type: 'module',
                            src: src,
                        },
                        injectTo: 'head',
                    },
                ],
            };
        },
    };
};
// Backward compatibility alias
const runtimeTelemetryPlugin = heartbeatPlugin;

export { heartbeatPlugin, runtimeTelemetryPlugin };
//# sourceMappingURL=heartbeatPlugin.js.map
