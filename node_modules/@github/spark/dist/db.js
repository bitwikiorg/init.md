import { K as KVClient } from './kv-WMiiBMWU.js';

// These values should NEVER change. The values are precisely for
// generating ULIDs.
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = 32; // from ENCODING.length;
const RANDOM_LEN = 16;
const TIME_LEN = 10;
const TIME_MAX = 281474976710655; // from Math.pow(2, 48) - 1;

var ULIDErrorCode;
(function (ULIDErrorCode) {
    ULIDErrorCode["Base32IncorrectEncoding"] = "B32_ENC_INVALID";
    ULIDErrorCode["DecodeTimeInvalidCharacter"] = "DEC_TIME_CHAR";
    ULIDErrorCode["DecodeTimeValueMalformed"] = "DEC_TIME_MALFORMED";
    ULIDErrorCode["EncodeTimeNegative"] = "ENC_TIME_NEG";
    ULIDErrorCode["EncodeTimeSizeExceeded"] = "ENC_TIME_SIZE_EXCEED";
    ULIDErrorCode["EncodeTimeValueMalformed"] = "ENC_TIME_MALFORMED";
    ULIDErrorCode["PRNGDetectFailure"] = "PRNG_DETECT";
    ULIDErrorCode["ULIDInvalid"] = "ULID_INVALID";
    ULIDErrorCode["Unexpected"] = "UNEXPECTED";
    ULIDErrorCode["UUIDInvalid"] = "UUID_INVALID";
})(ULIDErrorCode || (ULIDErrorCode = {}));
class ULIDError extends Error {
    constructor(errorCode, message) {
        super(`${message} (${errorCode})`);
        this.name = "ULIDError";
        this.code = errorCode;
    }
}

function randomChar(prng) {
    let rand = Math.floor(prng() * ENCODING_LEN);
    if (rand === ENCODING_LEN) {
        rand = ENCODING_LEN - 1;
    }
    return ENCODING.charAt(rand);
}
/**
 * Detect the best PRNG (pseudo-random number generator)
 * @param root The root to check from (global/window)
 * @returns The PRNG function
 */
function detectPRNG(root) {
    const rootLookup = detectRoot();
    const globalCrypto = (rootLookup && (rootLookup.crypto || rootLookup.msCrypto)) ||
        (null);
    if (typeof globalCrypto?.getRandomValues === "function") {
        return () => {
            const buffer = new Uint8Array(1);
            globalCrypto.getRandomValues(buffer);
            return buffer[0] / 0xff;
        };
    }
    else if (typeof globalCrypto?.randomBytes === "function") {
        return () => globalCrypto.randomBytes(1).readUInt8() / 0xff;
    }
    else ;
    throw new ULIDError(ULIDErrorCode.PRNGDetectFailure, "Failed to find a reliable PRNG");
}
function detectRoot() {
    if (inWebWorker())
        return self;
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    return null;
}
function encodeRandom(len, prng) {
    let str = "";
    for (; len > 0; len--) {
        str = randomChar(prng) + str;
    }
    return str;
}
/**
 * Encode the time portion of a ULID
 * @param now The current timestamp
 * @param len Length to generate
 * @returns The encoded time
 */
function encodeTime(now, len = TIME_LEN) {
    if (isNaN(now)) {
        throw new ULIDError(ULIDErrorCode.EncodeTimeValueMalformed, `Time must be a number: ${now}`);
    }
    else if (now > TIME_MAX) {
        throw new ULIDError(ULIDErrorCode.EncodeTimeSizeExceeded, `Cannot encode a time larger than ${TIME_MAX}: ${now}`);
    }
    else if (now < 0) {
        throw new ULIDError(ULIDErrorCode.EncodeTimeNegative, `Time must be positive: ${now}`);
    }
    else if (Number.isInteger(now) === false) {
        throw new ULIDError(ULIDErrorCode.EncodeTimeValueMalformed, `Time must be an integer: ${now}`);
    }
    let mod, str = "";
    for (let currentLen = len; currentLen > 0; currentLen--) {
        mod = now % ENCODING_LEN;
        str = ENCODING.charAt(mod) + str;
        now = (now - mod) / ENCODING_LEN;
    }
    return str;
}
function inWebWorker() {
    // @ts-ignore
    return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
}
/**
 * Generate a ULID
 * @param seedTime Optional time seed
 * @param prng Optional PRNG function
 * @returns A ULID string
 * @example
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
function ulid(seedTime, prng) {
    const currentPRNG = detectPRNG();
    const seed = Date.now() ;
    return encodeTime(seed, TIME_LEN) + encodeRandom(RANDOM_LEN, currentPRNG);
}

const BASE_DB_SERVICE_URL = '/_spark/db';
// Enhanced database client that builds on the existing KV infrastructure
// Each document is stored as an individual KV entry with key format: {id}--{collectionName}
// Uses KV API for individual document operations and DB API for bulk operations
class DBClient {
    kv;
    constructor(kvClient) {
        this.kv = kvClient || new KVClient();
    }
    /**
     * Generate a unique document ID using ULID
     * @returns A unique document ID
     */
    generateDocId() {
        return ulid();
    }
    /**
     * Build storage key from ID and collection name
     * @param id The document ID
     * @param collectionName The collection name
     * @returns Storage key in format {id}--{collectionName}
     */
    buildKey(id, collectionName) {
        return `${id}--${collectionName}`;
    }
    /**
     * Get all documents in a collection using the DB API
     * @param collectionName The name of the collection
     * @returns Array of all documents in the collection with id field
     */
    async getAll(collectionName) {
        try {
            const response = await fetch(`${BASE_DB_SERVICE_URL}/collections/${collectionName}`, {
                method: 'GET',
            });
            if (!response.ok) {
                const errorMessage = `Failed to fetch DB collection: ${response.statusText}`;
                throw new Error(errorMessage);
            }
            let json;
            try {
                json = await response.json();
            }
            catch (error) {
                const errorMessage = 'Failed to parse DB collection response';
                throw new Error(errorMessage);
            }
            if (!Array.isArray(json)) {
                const errorMessage = 'DB collection response is not an array';
                throw new Error(errorMessage);
            }
            const entries = json;
            // TODO: remove filter when serverside filters are enabled
            return entries
                .filter((entry) => entry.key.endsWith(`--${collectionName}`))
                .map((entry) => {
                const id = entry.key.replace(`--${collectionName}`, '');
                return { id, ...JSON.parse(entry.value) };
            });
        }
        catch (error) {
            console.error(`Error getting collection ${collectionName}:`, error);
            return [];
        }
    }
    /**
     * Insert a document into a collection with schema validation
     * @param collectionName The name of the collection
     * @param schema The Zod schema for validation
     * @param data The document data to insert
     * @returns The inserted document with generated id
     */
    async insert(collectionName, schema, data) {
        const id = this.generateDocId();
        const key = this.buildKey(id, collectionName);
        const { id: _, ...dataWithoutId } = data;
        const validatedData = schema.parse(dataWithoutId);
        await this.kv.setKey(key, validatedData);
        return { ...validatedData, id };
    }
    /**
     * Get a document by ID from a collection
     * @param collectionName The name of the collection
     * @param id The document ID
     * @returns The document with id field or null if not found
     */
    async get(collectionName, id) {
        try {
            const key = this.buildKey(id, collectionName);
            const doc = await this.kv.getKey(key);
            if (!doc)
                return null;
            return { ...doc, id };
        }
        catch (error) {
            console.error(`Error getting document ${id} from ${collectionName}:`, error);
            return null;
        }
    }
    /**
     * Update a document with partial data and schema validation
     * @param collectionName The name of the collection
     * @param id The document ID
     * @param schema The Zod schema for validation
     * @param data Partial data to update
     * @returns The updated document or null if not found
     */
    async update(collectionName, id, schema, data) {
        try {
            const key = this.buildKey(id, collectionName);
            const existing = await this.kv.getKey(key);
            if (!existing)
                return null;
            const { id: _, ...dataWithoutId } = data;
            const updated = { ...existing, ...dataWithoutId };
            const validatedData = schema.parse(updated);
            await this.kv.setKey(key, validatedData);
            return { ...validatedData, id };
        }
        catch (error) {
            console.error(`Error updating document ${id} in ${collectionName}:`, error);
            return null;
        }
    }
    /**
     * Delete a document from a collection
     * @param collectionName The name of the collection
     * @param id The document ID to delete
     * @returns true if document was deleted, false if not found
     */
    async delete(collectionName, id) {
        try {
            const key = this.buildKey(id, collectionName);
            await this.kv.deleteKey(key);
            return true;
        }
        catch (error) {
            console.error(`Error deleting document ${id} from ${collectionName}:`, error);
            return false;
        }
    }
    /**
     * Query documents with filtering
     * @param collectionName The name of the collection
     * @param filterFn Function to filter documents
     * @returns Array of filtered documents
     */
    async query(collectionName, filterFn) {
        const collection = await this.getAll(collectionName);
        return collection.filter(filterFn);
    }
}

const db = new DBClient();
/**
 * Create a collection instance with schema validation and clean API
 * @param schema The Zod schema for the collection
 * @param collectionName The name of the collection
 * @returns Collection instance with CRUD operations
 */
function collection(schema, collectionName) {
    return {
        async insert(data) {
            return db.insert(collectionName, schema, data);
        },
        async get(id) {
            return db.get(collectionName, id);
        },
        async update(id, data) {
            return db.update(collectionName, id, schema, data);
        },
        async delete(id) {
            return db.delete(collectionName, id);
        },
        async getAll() {
            return db.getAll(collectionName);
        },
        async query(options) {
            // Get all documents first
            let results = await db.getAll(collectionName);
            // Apply where condition
            if (options?.where) {
                const condition = options.where;
                results = results.filter((doc) => {
                    const fieldValue = doc[condition.field];
                    switch (condition.operator) {
                        case '==': return fieldValue === condition.value;
                        case '!=': return fieldValue !== condition.value;
                        case '>': return fieldValue > condition.value;
                        case '<': return fieldValue < condition.value;
                        case '>=': return fieldValue >= condition.value;
                        case '<=': return fieldValue <= condition.value;
                        default: return false;
                    }
                });
            }
            // Apply sorting
            if (options?.sortBy) {
                results.sort((a, b) => {
                    const aVal = a[options.sortBy.field];
                    const bVal = b[options.sortBy.field];
                    if (aVal < bVal)
                        return options.sortBy.direction === 'asc' ? -1 : 1;
                    if (aVal > bVal)
                        return options.sortBy.direction === 'asc' ? 1 : -1;
                    return 0;
                });
            }
            // Apply limit
            if (options?.limit !== undefined) {
                results = results.slice(0, options.limit);
            }
            return results;
        }
    };
}

export { DBClient as DB, collection };
//# sourceMappingURL=db.js.map
