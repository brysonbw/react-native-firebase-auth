// user interface
export interface User {
    uid: string
    email: string
    emailVerified: boolean
    displayName: string
    createdAt?: number | string
}