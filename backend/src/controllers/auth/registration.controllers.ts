import { Request, Response, NextFunction } from "express";
import { APIError } from "../../config/error";
import { AuthServices } from "../../services/auth";

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const { username, email, password } = req.body

        if (!username || !email || !password) {
            throw new APIError("Email and password required", 400)
        }

        await AuthServices.Registration.signUp({username, email, password})
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please confirm your email'
        })

    } catch (error) {
        next(error)
    }
}

export async function confirmSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const { username, code } = req.body

        if (!username || !code) {
            throw new APIError("Username and code required")
        }

        await AuthServices.Registration.confirmSignUp({username, code})

        res.status(201).json({
            success: true,
            message: 'User successfully confirmed sign up'
        })

    } catch (error) {
        next(error)
    }
}
