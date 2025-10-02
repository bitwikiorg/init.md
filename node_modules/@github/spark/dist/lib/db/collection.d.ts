import { z } from 'zod';
/**
 * Collection interface that provides document operations with schema validation
 */
export interface Collection<T extends z.ZodType> {
    /**
     * Insert a new document into the collection
     * @param data The document data to insert
     * @returns Promise that resolves to the inserted document with id
     */
    insert(data: z.infer<T>): Promise<z.infer<T> & {
        id: string;
    }>;
    /**
     * Get a document by its ID
     * @param id The document ID
     * @returns Promise that resolves to the document or null if not found
     */
    get(id: string): Promise<(z.infer<T> & {
        id: string;
    }) | null>;
    /**
     * Update a document with partial data
     * @param id The document ID
     * @param data Partial data to update
     * @returns Promise that resolves to the updated document or null if not found
     */
    update(id: string, data: Partial<z.infer<T>>): Promise<(z.infer<T> & {
        id: string;
    }) | null>;
    /**
     * Delete a document by its ID
     * @param id The document ID
     * @returns Promise that resolves to true if deleted, false if not found
     */
    delete(id: string): Promise<boolean>;
    /**
     * Get all documents in the collection
     * @returns Promise that resolves to an array of all documents
     */
    getAll(): Promise<(z.infer<T> & {
        id: string;
    })[]>;
    /**
     * Query documents with filtering, sorting, and limiting
     * @param options Query options including where conditions, sorting, and limit
     * @returns Promise that resolves to an array of matching documents
     */
    query(options?: QueryOptions<T>): Promise<(z.infer<T> & {
        id: string;
    })[]>;
}
/**
 * Query options for filtering, sorting, and limiting results
 */
export interface QueryOptions<T extends z.ZodType> {
    /**
     * Filter condition
     */
    where?: {
        field: keyof z.infer<T>;
        operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
        value: any;
    };
    /**
     * Sort configuration
     */
    sortBy?: {
        field: keyof z.infer<T>;
        direction: 'asc' | 'desc';
    };
    /**
     * Maximum number of results to return
     */
    limit?: number;
}
/**
 * Create a collection instance with schema validation and clean API
 * @param schema The Zod schema for the collection
 * @param collectionName The name of the collection
 * @returns Collection instance with CRUD operations
 */
export declare function collection<T extends z.ZodType>(schema: T, collectionName: string): Collection<T>;
