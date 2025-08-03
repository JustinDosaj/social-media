export interface ISignUp {
    email: string,
    username: string,
    password: string
}

export interface IConfirmSignUp {
    username: string,
    code: string,
}

export interface ISignIn {
    email: string,
    password: string,
}
