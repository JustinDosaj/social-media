import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const REGION = process.env.COGNITO_REGION as string
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string
const CLIENT_ID = process.env.COGNITO_CLIENT_ID as string

const verifier = CognitoJwtVerifier.create({
    userPoolId: USER_POOL_ID,
    tokenUse: 'id',
    clientId: CLIENT_ID
})

export async function verifyToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Missing or invalid token'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = await verifier.verify(token);
        req.user = payload;
        next();
    } catch (error) {
        console.error('JWT verification failed: ', error)
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}