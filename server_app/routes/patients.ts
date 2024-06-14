import express, { Router } from "express";
import { PatientController } from "../lib/controllers/patient-controller";
import { TreatmentController } from "../lib/controllers/treatment-controller";
import { GuardianController } from "../lib/controllers/guardian-controller";
import checkAuth from "../lib/middlewares/auth";

const router: Router = express.Router();
const patientController: PatientController = new PatientController();
const treatmentController: TreatmentController = new TreatmentController();
const guardianController: GuardianController = new GuardianController();


const patientRoute: string = "patients";


router.route("/").get(checkAuth, patientController.getAll);
router.route("/").post(checkAuth, patientController.add);
router.route("/:patientId").put(checkAuth, patientController.update);
router.route("/:patientId").delete(checkAuth, patientController.delete);
router.route("/:patientId").get(checkAuth, patientController.get);
router.route("/:patientId/treatments").get(checkAuth, treatmentController.getAll);
router.route("/:patientId/treatments/:treatmentId").get(checkAuth, treatmentController.get);
router.route("/:patientId/treatments").post(checkAuth, treatmentController.add);
router.route("/:patientId/treatments/:treatmentId").put(checkAuth, treatmentController.update);
router.route("/:patientId/treatments/:treatmentId").delete(checkAuth, treatmentController.delete);
router.route("/:patientId/guardians/").get(checkAuth, guardianController.getAll);
router.route("/:patientId/guardians/:guardianId").get(checkAuth, guardianController.get);
router.route("/:patientId/guardians").post(checkAuth, guardianController.add);
router.route("/:patientId/guardians/:guardianId").put(checkAuth, guardianController.update);
router.route("/:patientId/guardians/:guardianId").delete(checkAuth, guardianController.delete);



export { router as PatientRouter, patientRoute };
