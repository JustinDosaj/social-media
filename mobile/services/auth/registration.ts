import axios from "axios"

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/auth`

export async function signUp(email: string, username: string, password: string) {
    
    const response = await axios({
        method: 'post',
        url: `${API_URL}/signup`,
        data: {
            email,
            username,
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
}