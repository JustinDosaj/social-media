export interface ISignUp {
    email: string,
    password: string
}

export interface IConfirmSignUp {
    email: string,
    code: string,
}

export interface ISignIn {
    email: string,
    password: string,
}

export interface IUser {
    email: string,
    sub: string,
    username: string
}
