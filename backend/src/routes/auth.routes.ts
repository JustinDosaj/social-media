import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post('/signup', AuthController.signUp);

router.post('/confirm', AuthController.confirmSignUp);

router.post('/login', AuthController.login);

router.post('/logout', verifyToken, AuthController.signOut);

router.get('/', verifyToken, AuthController.getUser)

export default router;