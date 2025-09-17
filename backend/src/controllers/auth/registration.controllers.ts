import { Request, Response, NextFunction } from "express";
import { APIError } from "../../config/error";
import { AuthServices } from "../../services/auth";

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new APIError("Email and password required", 400)
        }

        const response = await AuthServices.Registration.signUp({email, password})
        
        const user = {
            sub: response.UserSub
        }

        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please confirm your email',
            data: { user }
        })

    } catch (error) {
        next(error)
    }
}

export async function confirmSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const { email, code } = req.body

        if (!code) {
            throw new APIError("Username and code required")
        }

        await AuthServices.Registration.confirmSignUp({email, code})

        res.status(201).json({
            success: true,
            message: 'User successfully confirmed sign up'
        })

    } catch (error) {
        next(error)
    }
}
