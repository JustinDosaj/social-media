import axios from "axios"

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/auth`

export async function signUp(email: string, password: string) {
    
    const response = await axios({
        method: 'post',
        url: `${API_URL}/signup`,
        data: {
            email,
            password
        },
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })

    const payload = response.data

    if (!payload.success) {
        throw new Error(payload.message || "Sign Up Failed")
    }

    return payload.data
}

export async function confirmSignUp(email: string, code: string) {
    const response = await axios({
        method: 'post',
        url: `${API_URL}/confirm`,
        data: {
            email,
            code
        },
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })

    const payload = response.data

    if (!payload.success) {
        throw new Error(payload.message || "Problem Confirming Sign Up")
    }
}