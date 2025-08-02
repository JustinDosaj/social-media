import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

const router = Router();

router.post('/signup', AuthController.signUp)

export default router