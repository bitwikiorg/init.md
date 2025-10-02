export declare const KvEventType: {
    SPARK_KV_UPDATED: string;
    SPARK_KV_DELETED: string;
};
export type KvEventType = (typeof KvEventType)[keyof typeof KvEventType];
