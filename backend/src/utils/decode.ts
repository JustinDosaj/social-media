export function decodeJWT<T = any>(token: string): T {
    const payload = token.split('.')[1] || ''
    const decoded = Buffer.from(payload, 'base64').toString('utf-8')
    return JSON.parse(decoded) as T
}