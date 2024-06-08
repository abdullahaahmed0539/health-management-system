import { logger } from "../../error-logger";
import { Request, Response } from "express";
import { generate, verify as verifyPassword } from 'password-hash'
import jwt from 'jsonwebtoken';
import User from "../models/user";


class AuthController {

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = req.body;
      let newUser = new User({
        firstName,
        lastName,
        email,
      });
      newUser.hashedPassword = generate(password);
      newUser.role = 'basic'
      await newUser.save();
      return res.sendStatus(201);
    }
    catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: { message: "No user with the following email not found." } });
      const passwordVerified: boolean = verifyPassword(password, user.hashedPassword!);
      if (!passwordVerified) return res.status(401).json({ error: { message: "Incorrect password." } });
      const token = jwt.sign(
        {
          email: user.email,
          timeStamp: Date.now(),
          role: user.role,
        },
        process.env.JWT_PVT_KEY as string,
        { expiresIn: process.env.JWT_PVT_EXPIRY }
      );
      const responseObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
        role: user.role
      };
      return res.status(200).json(responseObj);
    }
    catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }
}



export { AuthController };
