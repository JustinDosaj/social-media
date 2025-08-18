import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { PostControllers } from "../controllers/posts.controllers";

const router = Router();

router.get('/', verifyToken, PostControllers.getPostsById)

export default router