import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { USER_POOL_ID, CLIENT_ID } from "../clients/cognito";

let verifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null

function getVerifier() {
    if (!verifier) {
        if (!USER_POOL_ID || !CLIENT_ID) {
            throw new Error("Cognito not initialized. Call initCognito() before using verifier.");
        }

        verifier = CognitoJwtVerifier.create({
            userPoolId: USER_POOL_ID,
            clientId: CLIENT_ID,
            tokenUse: "access"
        });
    }
    return verifier;
}

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
        const payload = await getVerifier().verify(token);
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