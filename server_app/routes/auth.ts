import express, { Router } from "express";
import { AuthController } from "../lib/controllers/auth-controller";

const router: Router = express.Router();

router.route("/register").post(AuthController.register);
// router.route("/login").post(AuthController.login);

export { router as Router };
