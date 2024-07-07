import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import Patient from "../models/patient";
import { Controller } from "./interfaces/controller";
import User from "../models/user";
import { generate } from "password-hash";
import { addUser, getAllUsers, getUser } from "../blockchain/transactionFunctions";

class UserController implements Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "sysAdmin") {
        const users = await User.find().select("-hashedPassword");
        await getAllUsers();
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
                
                await getUser(userId);
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
    
  async update(req: Request, res: Response): Promise<Response> {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, address, dateOfBirth, phoneNumber, designation, userRole, city, country, gender} = req.body;
        const token = req.headers.authorization!.split(" ")[1];
        const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
        const role = (<any>verifiedUser).role;
        if (role === "sysAdmin") {
            const userToBeUpdated = await User.findById(userId).select("-hashedPassword");
            if (userToBeUpdated) {
                userToBeUpdated.firstName = firstName
                ? firstName
                : userToBeUpdated.firstName;
                userToBeUpdated.lastName = lastName
                ? lastName
                : userToBeUpdated.lastName;
                if (address) userToBeUpdated.addresses.push(address);
                userToBeUpdated.dateOfBirth = dateOfBirth
                ? dateOfBirth
                : userToBeUpdated.dateOfBirth;
                if (phoneNumber) userToBeUpdated.phoneNumbers.push(phoneNumber);
                userToBeUpdated.designation = designation
                ? designation
                : userToBeUpdated.designation;
                userToBeUpdated.role = userRole
                ? userRole
                : userToBeUpdated.role;
                userToBeUpdated.city = city ? city : userToBeUpdated.city;
                userToBeUpdated.country = country
                ? country
                : userToBeUpdated.country;
                userToBeUpdated.gender = gender
                ? gender
                : userToBeUpdated.gender;

              await userToBeUpdated.updateOne(userToBeUpdated);
              await addUser(
                userId,
                userToBeUpdated.firstName as string,
                userToBeUpdated.lastName as string,
                userToBeUpdated.email as string,
                userToBeUpdated.dateOfBirth as unknown as string,
                userToBeUpdated.city as string,
                address as string,
                userToBeUpdated.role as string,
                userToBeUpdated.country as string,
                userToBeUpdated.gender as string,
                phoneNumber as string
              );
                return res.status(201).json({
                user: userToBeUpdated,
                });
            }
            return res.status(404).json({
              error: { message: `No user with userId ${userId} found.` },
            });
        }

        const user = await User.findOne({
          email: (<any>verifiedUser).email as string,
        }).select("-hashedPassword");
        
       if (userId === user?.id) {
           user.firstName = firstName ? firstName : user.firstName;
           user.lastName = lastName ? lastName : user.lastName;
           if (address) user.addresses.push(address);
           user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
           if (phoneNumber) user.phoneNumbers.push(phoneNumber);
           user.designation = designation ? designation : user.designation;
           user.role = userRole ? userRole : user.role;
           user.city = city ? city : user.city;
           user.country = country ? country : user.country;
           user.gender = gender ? gender : user.gender;
         await user.updateOne(user);
          await addUser(
            userId,
            user.firstName as string,
            user.lastName as string,
            user.email as string,
            user.dateOfBirth as unknown as string,
            user.city as string,
            address as string,
            user.role as string,
            user.country as string,
            user.gender as string,
            phoneNumber as string
          );
           return res.status(201).json({
             user,
           });
       }
        return res
            .status(401)
            .json({ error: { message: "Unauthorized Access." } });
    }
    catch (err: any) {
        const errorMessage: string = (err as Error).message;
        logger.error(errorMessage);
        return res.status(500).json({ errorMessage });
    }
  }
    
  async delete(req: Request, res: Response): Promise<Response> {
      try {
        const userId = req.params.userId;
        const token = req.headers.authorization!.split(" ")[1];
        const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
        const role = (<any>verifiedUser).role;
        if (role === "sysAdmin") {
            const userToBeDelete = await User.findById(userId).select("-hashedPassword");
            if (userToBeDelete && userToBeDelete.email !== process.env.ADMIN_EMAIL) {
                 await Patient.deleteOne({ userId: userToBeDelete.id });
                 await userToBeDelete.deleteOne();
                 return res.sendStatus(204);
            }
            else {
                return res
                  .status(401)
                  .json({ error: { message: "Forbidden to delete sysAdmin." } });
            }
               
        }
        return res
            .status(401)
            .json({ error: { message: "Unauthorized Access." } });
      }
      catch (err: any) {
        const errorMessage: string = (err as Error).message;
        logger.error(errorMessage);
        return res.status(500).json({ errorMessage });
      }
    }
}

export { UserController };
