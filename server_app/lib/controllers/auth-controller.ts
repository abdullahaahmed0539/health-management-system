import { logger } from "../../error-logger";
import { Request, Response } from "express";
import { generate }  from 'password-hash'
import User from '../models/user';
import { add } from "winston";


class AuthController {  
  
  public static route: string = "auth";

  public static async register(req: Request, res: Response): Promise<Response> {
    try {
      const {firstName, lastName, address, email, password} = req.body;
      let newUser: User = new User (undefined, firstName, lastName, email, address, "",password);
      newUser.setHashedPassword(generate(newUser.getPassword()));
      return res.json(newUser);

     
    } catch (err) {
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
