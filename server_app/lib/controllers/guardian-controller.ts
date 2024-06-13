import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import { Controller } from "./interfaces/controller";
import Patient from "../models/patient";
import User from "../models/user";

class GuardianController implements Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      throw new Error("Method not implemented.");
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
      throw new Error("Method not implemented.");
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
