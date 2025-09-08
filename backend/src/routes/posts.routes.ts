import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { PostControllers } from "../controllers/posts";

const router = Router();

router.get('/', verifyToken, PostControllers.Posts.getPostsById)

export default router