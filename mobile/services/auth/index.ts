import { signUp, confirmSignUp } from "./registration"
import { login, logout } from "./session"

export const AuthServices = {
    login,
    logout,
    signUp,
    confirmSignUp
}