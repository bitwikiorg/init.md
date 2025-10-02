export declare const EventType: {
    SPARK_RUNTIME_ERROR: string;
    SPARK_RUNTIME_PING: string;
    SPARK_RUNTIME_LOADED: string;
    SPARK_VITE_WS_CONNECT: string;
    SPARK_VITE_WS_DISCONNECT: string;
    SPARK_VITE_ERROR: string;
    SPARK_VITE_AFTER_UPDATE: string;
    ROOT_ELEMENT_STATUS: string;
    KV_CLIENT_ERROR: string;
};
export type EventType = (typeof EventType)[keyof typeof EventType];
