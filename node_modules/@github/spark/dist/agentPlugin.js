function sparkAgent(opts = {}) {
    const serverURL = opts.serverURL || 'http://localhost:9000';
    const disabled = opts.disabled || false;
    const maxRetries = opts.maxRetries || 5;
    const retryDelay = opts.retryDelay || 1000; // ms
    async function sendEvent(event, retries = 0) {
        if (disabled)
            return true;
        try {
            const res = await fetch(`${serverURL}/notify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (!res.ok) {
                console.warn('Failed to send event to Spark Agent:', res.status, res.statusText);
                if (retries < maxRetries) {
                    console.log(`Retrying event delivery (attempt ${retries + 1}/${maxRetries})...`);
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                    return sendEvent(event, retries + 1);
                }
                return false;
            }
            return true;
        }
        catch (err) {
            console.warn('Failed to send event to Spark Agent:', err);
            if (retries < maxRetries) {
                console.log(`Retrying event delivery (attempt ${retries + 1}/${maxRetries})...`);
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                return sendEvent(event, retries + 1);
            }
            return false;
        }
    }
    function sendStartedEvent(file) {
        return sendEvent({ type: 'build:started', timestamp: new Date().getTime(), details: { file } });
    }
    function sendSuccessEvent(file) {
        return sendEvent({ type: 'build:success', timestamp: new Date().getTime(), details: { file } });
    }
    function sendErrorEvent(error) {
        const event = {
            type: 'build:failed',
            timestamp: new Date().getTime(),
            details: {
                error: {
                    message: error || 'Unknown error',
                },
            },
        };
        return sendEvent(event);
    }
    if (disabled) {
        return { name: 'spark-agent:disabled', apply: 'build' };
    }
    return {
        name: 'spark-agent',
        apply: 'serve',
        configureServer(server) {
            server.watcher.on('change', (file) => {
                sendStartedEvent(file);
            });
            const wss = server.ws.send;
            server.ws.send = function (payload) {
                if (payload.type === 'update') {
                    const file = payload.updates[0]?.path;
                    sendSuccessEvent(file);
                }
                else if (payload.type === 'error') {
                    let errorMessage;
                    if (payload.err) {
                        try {
                            const parsedError = JSON.parse(JSON.stringify(payload.err));
                            errorMessage = [
                                parsedError.message,
                                parsedError.frame,
                                `at ${parsedError.id}:${parsedError.loc?.line}:${parsedError.loc?.column}`,
                            ]
                                .filter(Boolean)
                                .join('\n');
                        }
                        catch {
                            errorMessage = JSON.stringify(payload.err);
                        }
                    }
                    else {
                        errorMessage =
                            payload.error?.stack ||
                                payload.error?.message ||
                                (typeof payload.error === 'string' ? payload.error : JSON.stringify(payload.error)) ||
                                'Unknown error';
                    }
                    sendErrorEvent(errorMessage);
                }
                return wss.call(this, payload);
            };
        },
        buildStart() {
            sendStartedEvent();
        },
        buildEnd(err) {
            if (err) {
                sendErrorEvent(err.message);
            }
            else {
                sendSuccessEvent();
            }
        },
    };
}

export { sparkAgent as default };
//# sourceMappingURL=agentPlugin.js.map
