import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import { Controller } from "./interfaces/controller";
import Patient from "../models/patient";
import User from "../models/user";
import Treatment from "../models/treatment";


class TreatmentController implements Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const userId = req.params.patientId;
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      const idFromToken = (
        await User.findOne({ email: (<any>verifiedUser).email as string })
      )?.id;

      if (role === "sysAdmin" || role === "doctor" || userId === idFromToken) {
        const patient = await Patient.findOne({ userId });
        if (!patient)
          return res.status(404).json({
            error: {
              message: `No patient with userId ${userId} found.`,
            },
          });
        return res.status(200).json(patient.treatmentHistory);
      }
      return res.status(401).json({
        error: {
          message: `Unauthorized access.`,
        },
      });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const userId = req.params.patientId;
      const treatmentId = req.params.treatmentId;
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      const idFromToken = (
        await User.findOne({ email: (<any>verifiedUser).email as string })
      )?.id;

      if (role === "sysAdmin" || role === "doctor" || userId === idFromToken) {
        const patient = await Patient.findOne({ userId });
        if (!patient)
          return res.status(404).json({
            error: {
              message: `No patient with userId ${userId} found.`,
            },
          });
        return res
          .status(200)
          .json(
            patient.treatmentHistory.find(
              (x) => x._id.toString() === treatmentId
            )
          );
      }
      return res.status(401).json({
        error: {
          message: `Unauthorized access.`,
        },
      });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const userId = req.params.patientId;
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "doctor" || role === "sysAdmin") {
        const { name, diseaseName, doctorId, doctorName, treatmentDate } =
          req.body;

        if (
          !name ||
          !diseaseName ||
          !doctorId ||
          !doctorName ||
          !treatmentDate
        ) {
          return res.status(400).json({
            error: {
              message:
                "Please Enter name, disease name, doctor id, doctor name, treatment date",
            },
          });
        }

        const patient = await Patient.findOne({ userId });
        if (!patient)
          return res.status(404).json({
            error: {
              message: `No patient with user id ${userId} found.`,
            },
          });
        let newTreatment = new Treatment();
        newTreatment.name = name;
        newTreatment.diseaseName;
        newTreatment.doctorId;
        newTreatment.doctorName = doctorName;
        newTreatment.treatmentDate = treatmentDate;

        patient.treatmentHistory.push(newTreatment);
        await patient.updateOne(patient);
        return res.status(201).json({
          patient,
        });
      }
      return res
        .status(401)
        .json({ error: { message: "Unauthorized Access." } });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }
    
  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export { TreatmentController };
