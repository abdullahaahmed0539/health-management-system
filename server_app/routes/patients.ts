import express, { Router } from "express";
import { PatientController } from "../lib/controllers/patient-controller";
import checkAuth from "../lib/middlewares/auth";

const router: Router = express.Router();
const patientController: PatientController = new PatientController();

const patientRoute: string = "patients";


router.route("/").get(checkAuth, patientController.getAll);
router.route("/").post(checkAuth, patientController.add);



export { router as PatientRouter, patientRoute };
