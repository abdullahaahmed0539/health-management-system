import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import Patient from "../models/patient";
import { Controller } from "./interfaces/controller";
import User from "../models/user";
import { generate } from "password-hash";

class UserController implements Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "sysAdmin") {
        const users = await User.find().select("-hashedPassword");;
        return res.status(200).json(users);
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

  async get(req: Request, res: Response): Promise<Response> {
      try {
            const userId = req.params.userId
            const token = req.headers.authorization!.split(" ")[1];
            const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
            const role = (<any>verifiedUser).role;
            const idFromToken = (await User.findOne({ email: (<any>verifiedUser).email as string }))?.id;
            if (role === "sysAdmin" || (role === 'patient' && userId === idFromToken)) {
                const user = await User.findById(userId).select("-hashedPassword");;
                if(!user) return res
                  .status(404)
                    .json({ error: { message: `No user with userId ${userId} found.` } });
                
                return res
                  .status(200)
                  .json({
                    user
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
  async add(req: Request, res: Response): Promise<Response> {
    try {
        throw new Error("not imple");
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

export { UserController };
