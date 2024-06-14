import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../error-logger";
import User from "../models/user";
import Patient from "../models/patient";
import { Controller } from "./interfaces/controller";
import { generate } from "password-hash";

class PatientController implements Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "doctor" || role === "staff" || role === "sysAdmin") {
        const patients = await User.find({ role: 'patient' }).select("-hashedPassword");
        return res.status(200).json(patients);
      }
      return res.status(401).json({ error: { message: "Unauthorized Access." } });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      const idFromToken = (await User.findOne({ email: (<any>verifiedUser).email as string }))?.id;

      if (role === "sysAdmin" || role === "staff" || role === "doctor" || (role === 'patient' && userId === idFromToken)) {
        const user = await User.findById(userId).select("-hashedPassword");
        if (!user) {
          return res.status(404).json({ error: { message: `No user with userId ${userId} found.` } });
        }

        const patient = await Patient.findOne({ userId });
        if (!patient) {
          return res.status(404).json({ error: { message: `No patient with userId ${userId} found.` } });
        }
        const responseObj = { 'patient' : {...user,'treatmentHistory' : patient.treatmentHistory, 'guardianInfo' : patient.guardianInfo}
        }
        return res.status(200).json({ user, patient });
      }
      return res.status(401).json({ error: { message: "Unauthorized Access." } });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;
      if (role === "doctor" || role === "staff" || role === "sysAdmin") {
        const { firstName, lastName, email, address, gender, dateOfBirth, phoneNumber, city, country } = req.body;
        if (!firstName || !lastName || !email || !address || !gender || !dateOfBirth || !phoneNumber || !city || !country) {
          return res.status(400).json({ error: { message: "Please Enter first Name, last Name, email, address, gender, date Of Birth, phone Number, city, country" } });
        }

        const user = await User.findOne({ email });
        const patient = await Patient.findOne({ userId: user?._id });

        if (user && patient) {
          return res.status(409).json({ error: { message: "Patient Already Exist." } });
        }

        if (user && !patient) {
          const newPatient = new Patient();
          newPatient.userId = user._id as unknown as string;
          console.log(newPatient)
          await newPatient.save();
          user.hashedPassword = null;
          if (user.role === 'basic') user.role = "patient";
          const responseObj = { "patient": user };
          return res.status(201).json(responseObj);
        }

        if (!user && !patient) {
          const newUser = new User();
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.email = email;
          newUser.addresses.push(address);
          newUser.gender = gender;
          newUser.dateOfBirth = dateOfBirth;
          newUser.phoneNumbers.push(phoneNumber);
          newUser.city = city;
          newUser.country = country;
          newUser.hashedPassword = generate("patient123");
          newUser.role = 'patient';
          await newUser.save();
          const newPatient = new Patient();
          newPatient.userId = newUser._id as unknown as string;
          await newPatient.save();
          newUser.hashedPassword = null;
          const responseObj = { "patient": newUser };
          return res.status(201).json(responseObj);
        }
      }
      return res.status(401).json({ error: { message: "Unauthorized Access." } });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      
      // const userId = req.params.userId;
      // const { firstName, lastName, address, dateOfBirth, phoneNumber, designation, userRole, city, country, gender } = req.body;
      // const token = req.headers.authorization!.split(" ")[1];
      // const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      // const role = (<any>verifiedUser).role;

      // if (role === "sysAdmin") {
      //   const userToBeUpdated = await User.findById(userId).select("-hashedPassword");
      //   if (userToBeUpdated) {
      //     userToBeUpdated.firstName = firstName ? firstName : userToBeUpdated.firstName;
      //     userToBeUpdated.lastName = lastName ? lastName : userToBeUpdated.lastName;
      //     if (address) userToBeUpdated.addresses.push(address);
      //     userToBeUpdated.dateOfBirth = dateOfBirth ? dateOfBirth : userToBeUpdated.dateOfBirth;
      //     if (phoneNumber) userToBeUpdated.phoneNumbers.push(phoneNumber);
      //     userToBeUpdated.designation = designation ? designation : userToBeUpdated.designation;
      //     userToBeUpdated.role = userRole ? userRole : userToBeUpdated.role;
      //     userToBeUpdated.city = city ? city : userToBeUpdated.city;
      //     userToBeUpdated.country = country ? country : userToBeUpdated.country;
      //     userToBeUpdated.gender = gender ? gender : userToBeUpdated.gender;

      //     await userToBeUpdated.save();
      //     return res.status(201).json({
      //       user: userToBeUpdated,
      //     });
      //   }
      //   return res.status(404).json({
      //     error: { message: `No user with userId ${userId} found.` },
      //   });
      // }

      // const patientToUpdate = await Patient.findOne({ userId });
      // if (!patientToUpdate) {
      //   return res.status(404).json({ error: { message: `No patient with userId ${userId} found.` } });
      // }

      // const patientUser = await User.findById(patientToUpdate.userId);
      // if (!patientUser) {
      //   return res.status(404).json({ error: { message: `No user with userId ${userId} found.` } });
      // }

      // if (patientUser.email === (<any>verifiedUser).email) {
      //   patientUser.firstName = firstName ? firstName : patientUser.firstName;
      //   patientUser.lastName = lastName ? lastName : patientUser.lastName;
      //   if (address) patientUser.addresses.push(address);
      //   patientUser.dateOfBirth = dateOfBirth ? dateOfBirth : patientUser.dateOfBirth;
      //   if (phoneNumber) patientUser.phoneNumbers.push(phoneNumber);
      //   patientUser.designation = designation ? designation : patientUser.designation;
      //   patientUser.role = userRole ? userRole : patientUser.role;
      //   patientUser.city = city ? city : patientUser.city;
      //   patientUser.country = country ? country : patientUser.country;
      //   patientUser.gender = gender ? gender : patientUser.gender;

      //   await patientUser.save();
      //   return res.status(201).json({
      //     user: patientUser,
      //   });
      // }

      // return res.status(401).json({ error: { message: "Unauthorized Access." } });
      return res.status(200)
    
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.patientId;
      console.log(userId)
      const token = req.headers.authorization!.split(" ")[1];
      const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
      const role = (<any>verifiedUser).role;

      if (role === "sysAdmin") {
        // Delete associated patient record
        const patientDeleteResult = await Patient.findOneAndDelete({ userId });

        if (!patientDeleteResult) {
          return res.status(404).json({ error: { message: `No patient with userId ${userId} found.` } });
        }

        // Delete user record
        const userDeleteResult = await User.findOneAndDelete({ _id: patientDeleteResult.userId });

        if (!userDeleteResult) {
          return res.status(404).json({ error: { message: `No user with userId ${userId} found.` } });
        }

        return res.status(204).json({ message: `User with userId ${userId} and associated patient deleted successfully.` });
      }

      // For other roles, e.g., patients deleting themselves
      const patientToDelete = await Patient.findOne({ userId });

      if (!patientToDelete) {
        return res.status(404).json({ error: { message: `No patient with userId ${userId} found.` } });
      }

      const patientUser = await User.findById(patientToDelete.userId);

      if (!patientUser) {
        return res.status(404).json({ error: { message: `No user with userId ${userId} found.` } });
      }

      if (patientUser.email === (<any>verifiedUser).email) {
        // Delete patient record
        const deletedPatient = await patientToDelete.deleteOne();

        if (!deletedPatient) {
          return res.status(404).json({ error: { message: `Failed to delete patient with userId ${userId}.` } });
        }

        // Mark user as a basic role if no more associated patients
        const otherPatients = await Patient.findOne({ userId: { $ne: patientUser._id } });

        if (!otherPatients) {
          patientUser.role = 'basic';
          await patientUser.save();
        }

        return res.status(200).json({ message: `Patient with userId ${userId} deleted successfully.` });
      }

      return res.status(401).json({ error: { message: "Unauthorized Access." } });
    } catch (err: any) {
      const errorMessage: string = (err as Error).message;
      logger.error(errorMessage);
      return res.status(500).json({ errorMessage });
    }
  }
}

export { PatientController };
