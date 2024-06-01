import express, { Router } from "express";
import { AuthController } from "../lib/controllers/auth-controller";
import checkAuth from "../lib/middlewares/auth";

const router: Router = express.Router();
const authController: AuthController = new AuthController();

const authRoute: string = "auth";
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

export { router as AuthRouter, authRoute };
