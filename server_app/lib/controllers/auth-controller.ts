import { logger } from "../../error-logger";
import { Request, Response } from "express";
import { generate }  from 'password-hash'
import User from "../models/user";


class AuthController {

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, address, email, password } = req.body;
      let newUser = new User({
        firstName,
        lastName,
        email,
        password,
        address
      });
      newUser.hashedPassword = generate(newUser.password as string);
      const userCreated: any = await newUser.save();
      return res.status(201).json(userCreated);
    }
    catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  // public static async login(req: Request, res: Response): Promise<Response> {
  //   try {

  //   } catch (err) {
  //     const errorMessage: string = (err as Error).message;
  //     logger.error(errorMessage);
  //     return res.status(500).json({ errorMessage });
  //   }
  // }
}



export { AuthController };
