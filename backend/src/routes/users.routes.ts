import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { UserControllers } from "../controllers/users.controllers";

const router = Router()

router.get('/:username', verifyToken, UserControllers.getProfileByUsername)

export default router