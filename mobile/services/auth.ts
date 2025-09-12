

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/auth`

export async function loginRequest(email: string, password: string) {

    console.log("TEST: ", `${API_URL}/login`)
    
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
        credentials: 'include'
    })

    const responseObj = await response.json()

    if (!response.ok || responseObj.success === false ) {
        throw new Error(responseObj.message || "Login Failed")
    }

    return responseObj.data
}