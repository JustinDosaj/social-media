import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { UserControllers } from "../controllers/users";

const router = Router()

router.get('/:username', verifyToken, UserControllers.Profile.getProfileByUsername)

export default router