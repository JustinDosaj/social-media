export interface IUser {
    email: string,
    token: string,
    sub: string,
    expiresIn?: number,
    expiresAt?: number
}