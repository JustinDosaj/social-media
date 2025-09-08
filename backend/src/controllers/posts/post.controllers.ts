import { NextFunction, Request, Response } from "express";
import { PostServices } from "../../services/posts";
import { APIError } from "../../config/error";

export async function getPostsById(req: Request, res: Response, next: NextFunction) {

    try {

        const user = req.user

        if (!user) throw new APIError('Unauthorized user', 401)

        const posts = await PostServices.Posts.getPostsById(user.sub)

        if (!posts || posts.length === 0) throw new APIError('Could not find posts', 404)

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: { posts }
        })


    } catch (error) {
        next(error)
    }

}