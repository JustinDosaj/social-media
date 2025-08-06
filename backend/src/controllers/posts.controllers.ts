import { Request, Response } from "express";
import { PostServices } from "../services/posts.services";
import { APIError } from "../config/error";

export class PostControllers {

    static async getPostsById(req: Request, res: Response) {

        try {

            const user = req.user

            console.log("User: ", user)

            if (!user) throw new APIError('Unauthorized user', 401)

            const posts = await PostServices.getPostsById(user.sub)

            return res.status(200).json({
                success: true,
                message: 'Posts retrieved successfully',
                data: { posts }
            })


        } catch (error) {
            console.error('Error in getPostsById controller', error)
            throw new APIError('Failed to fetch posts', 500)
        }

    }

}