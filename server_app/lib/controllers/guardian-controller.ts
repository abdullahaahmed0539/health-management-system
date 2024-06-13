import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import { Controller } from "./interfaces/controller";
import Patient from "../models/patient";
import User from "../models/user";
import Guardian from "../models/guardian-contact";

class GuardianController implements Controller {
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
        return res.status(200).json({ guardians: patient.guardianInfo });
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

  get(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const userId = req.params.patientId;
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "doctor" || role === "sysAdmin") {
        const { name, email, phone, relation } =
          req.body;

        if (
          !name ||
          !email ||
          !phone ||
          !relation 
        ) {
          return res.status(400).json({
            error: {
              message:
                "Please Enter name, email, phone & relation.",
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
        let newGuardian = new Guardian();
        newGuardian.name = name;
        newGuardian.email = email;
        newGuardian.phone = phone;
        newGuardian.relation = relation;

        patient.guardianInfo.push(newGuardian);
        await patient.updateOne(patient);
        return res.status(201).json({
          guardian: newGuardian,
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

export { GuardianController };
