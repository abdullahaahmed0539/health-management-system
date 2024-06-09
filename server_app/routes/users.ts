import express, { Router } from "express";
import { UserController } from "../lib/controllers/user-controller";
import checkAuth from "../lib/middlewares/auth";

const router: Router = express.Router();
const userController: UserController = new UserController();

const userRoute: string = "users";


router.route("/").get(checkAuth, userController.getAll);
// router.route("/").post(checkAuth, patientController.add);



export { router as UserRouter, userRoute };
