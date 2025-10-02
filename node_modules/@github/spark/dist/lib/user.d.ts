export interface User {
    avatarUrl: string;
    email: string;
    id: number;
    isOwner: boolean;
    login: string;
}
export declare function fetchUser(): Promise<null | User>;
