import { Request, Response, NextFunction } from "express";
import { AuthServices } from "../services/auth.services";


export class AuthController {

    static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { username, email, password } = req.body

            await AuthServices.signUp({username, email, password})
            res.status(201).json({
                success: true,
                message: 'User registered successfully. Please confirm your email'
            })

        } catch (error) {
            next(error)
        }
    }
}