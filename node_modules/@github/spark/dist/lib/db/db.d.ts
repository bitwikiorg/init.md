import { z } from 'zod';
import { KVClient } from '../kv';
export declare class DBClient {
    private kv;
    constructor(kvClient?: KVClient);
    /**
     * Generate a unique document ID using ULID
     * @returns A unique document ID
     */
    generateDocId(): string;
    /**
     * Build storage key from ID and collection name
     * @param id The document ID
     * @param collectionName The collection name
     * @returns Storage key in format {id}--{collectionName}
     */
    buildKey(id: string, collectionName: string): string;
    /**
     * Get all documents in a collection using the DB API
     * @param collectionName The name of the collection
     * @returns Array of all documents in the collection with id field
     */
    getAll<T>(collectionName: string): Promise<(T & {
        id: string;
    })[]>;
    /**
     * Insert a document into a collection with schema validation
     * @param collectionName The name of the collection
     * @param schema The Zod schema for validation
     * @param data The document data to insert
     * @returns The inserted document with generated id
     */
    insert<T extends z.ZodType>(collectionName: string, schema: T, data: z.infer<T>): Promise<z.infer<T> & {
        id: string;
    }>;
    /**
     * Get a document by ID from a collection
     * @param collectionName The name of the collection
     * @param id The document ID
     * @returns The document with id field or null if not found
     */
    get<T>(collectionName: string, id: string): Promise<(T & {
        id: string;
    }) | null>;
    /**
     * Update a document with partial data and schema validation
     * @param collectionName The name of the collection
     * @param id The document ID
     * @param schema The Zod schema for validation
     * @param data Partial data to update
     * @returns The updated document or null if not found
     */
    update<T extends z.ZodType>(collectionName: string, id: string, schema: T, data: Partial<z.infer<T>>): Promise<(z.infer<T> & {
        id: string;
    }) | null>;
    /**
     * Delete a document from a collection
     * @param collectionName The name of the collection
     * @param id The document ID to delete
     * @returns true if document was deleted, false if not found
     */
    delete(collectionName: string, id: string): Promise<boolean>;
    /**
     * Query documents with filtering
     * @param collectionName The name of the collection
     * @param filterFn Function to filter documents
     * @returns Array of filtered documents
     */
    query<T>(collectionName: string, filterFn: (doc: T & {
        id: string;
    }) => boolean): Promise<(T & {
        id: string;
    })[]>;
}
