

const API_URL = `${process.env.API_DOMAIN}/api/auth`

export async function loginRequest(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })

    const data = await response.json()

    if (!response.ok || data.success === false ) {
        throw new Error(data.message || "Login Failed")
    }

    return data
}