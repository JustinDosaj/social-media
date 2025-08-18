import { NextFunction, Request, Response } from "express";
import { ProfileServices } from "../services/profiles.services";
import { APIError } from "../config/error";

export class ProfileControllers {
    
    static async getProfileByUsername(req: Request, res: Response, next: NextFunction) {

        const { username } = req.user

        console.log("Username: ", username)

        try {

            const profile = await ProfileServices.getProfileByUsername(username)
            
            if (!profile) throw new APIError(`Could not find ${username} profile`, 404)
            
            return res.status(200).json({
                success: true,
                data: { profile }
            })

        } catch (error) {
            next(error)
        }
    }
}