import express, { Router } from "express";
import { PatientController } from "../lib/controllers/patient-controller";
import { TreatmentController } from "../lib/controllers/treatment-controller";
// import { GuardianController } from "../lib/controllers/guardian-controller";
import checkAuth from "../lib/middlewares/auth";

const router: Router = express.Router();
const patientController: PatientController = new PatientController();
const treatmentController: TreatmentController = new TreatmentController();
// const guardianController: GuardianController = new GuardianController();

const patientRoute: string = "patients";


router.route("/").get(checkAuth, patientController.getAll);
router.route("/").post(checkAuth, patientController.add);
router.route("/:patientId/treatments").get(checkAuth, treatmentController.getAll);
router.route("/:patientId/treatments/:treatmentId").get(checkAuth, treatmentController.get);
router.route("/:patientId/treatments").post(checkAuth, treatmentController.add);
// router.route("/:patientId/treatment/:treatmentId").put(checkAuth, treatmentController.);
// router.route("/:patientId/treatment/:treatmentId").delete(checkAuth, treatmentController.);
// router.route("/:patientId/guardians").post(checkAuth, guardianController.);
// router.route("/:patientId/guardians/:guardianId").put(checkAuth, guardianController.);
// router.route("/:patientId/guardians/:guardianId").delete(checkAuth, guardianController.);



export { router as PatientRouter, patientRoute };
