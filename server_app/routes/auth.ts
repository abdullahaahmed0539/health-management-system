import express, { Router } from "express";
import { AuthController } from "../lib/controllers/auth-controller";

const router: Router = express.Router();
const authController: AuthController = new AuthController();

const authRoute: string = "auth";
router.route("/register").post(authController.register);
// router.route("/login").get(AuthController.login);

export { router as AuthRouter, authRoute };
