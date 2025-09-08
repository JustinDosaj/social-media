import { Request, Response, NextFunction } from "express";
import { APIError } from "../../config/error";
import { AuthServices } from "../../services/auth";
import { IUser } from "../../types/auth";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new APIError("Email and password required", 400)
        }

        const response = await AuthServices.Session.login({email, password})

        if (!response) {
            throw new APIError("Failed to authenticate user", 400)
        }

        res.status(200).json({
            success: true,
            message: "Successfully signed user in",
            data: { 
                user: response.AuthenticationResult 
            }
        })
        
    } catch (error) {
        next(error)
    }
}

export async function signOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const accessToken = req.headers.authorization?.split(" ")[1]

        if (!accessToken) {
            throw new APIError('Missing access token', 401)
        }
        
        const response = await AuthServices.Session.signOut(accessToken)

        res.status(201).json({
            success: true,
            message: 'User logged out successfully'
        })

    } catch (error) {
        next(error)
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    try {
        const accessToken = req.headers.authorization?.split(" ")[1]

        if (!accessToken) {
            throw new APIError('Missing access token', 401)
        }

        const response = await AuthServices.Session.getUserSession(accessToken)

        if (!response) {
            throw new APIError('Failed to get user', 500)
        }

        const attributeMap = response.UserAttributes?.reduce((acc, attr) => {
            if (attr.Name && attr.Value) {
                acc[attr.Name] = attr.Value;
            }
            return acc
        }, {} as Record<string, string>) || {}

        const user: IUser = {
            email: attributeMap.email || '',
            sub: attributeMap.sub || '',
            username: response.Username || ''
        }

        res.status(200).json({
            success: true,
            data: {
                user: user
            }
        })

    } catch (error) {
        next(error)
    }
}