import axios from "axios"

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/auth`

export async function login(email: string, password: string) {

    const response = await axios({
        method: "post",
        url: `${API_URL}/login`,
        data: {
            email,
            password
        },
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })

    const payload = response.data

    if (!payload.success) {
        throw new Error(payload.message || "Login Failed")
    }

    return payload.data
}

export async function logout(token: string) {

    console.log("User Token: ", token)

    const response = await axios({
        method: 'post',
        url: `${API_URL}/logout`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    })

    console.log("Logout Response: ", response.data)
}