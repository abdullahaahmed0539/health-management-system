import { logger } from "../../error-logger";
import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import Patient from "../models/patient";
import {Controller} from "./interfaces/controller"
import User from "../models/user";
import { generate } from "password-hash";


class PatientController implements Controller {
    async getAll(req: Request, res: Response): Promise<Response> {
    
    try {
            const token = req.headers.authorization!.split(" ")[1];
            const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
            const role = (<any>verifiedUser).role;
            if(role==="doctor" || role==="staff" || role==="sysAdmin") {
                const patients = await Patient.find();
                return res.status(200).json (patients)  
            }
            return res.status(401).json({ error: { message: "Unauthorized Access." } })
            
      }
    catch (err: any) {
            const errorMessage: string = (err as Error).message;
            logger.error(errorMessage);
            return res.status(500).json({ errorMessage });
      }

    }

    get(req: Request, res: Response): Promise<Response>{
        throw new Error("Method not implemented.");
    }
    async add(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers.authorization!.split(" ")[1];
            const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
            const role = (<any>verifiedUser).role;
            if(role==="doctor" || role==="staff" || role==="sysAdmin") {
                const { firstName, lastName, email, address, gender,dateOfBirth,phoneNumber,city,country } = req.body;
                if (!firstName || !lastName || !email || !address || !gender || !dateOfBirth || !phoneNumber || !city || !country) 
                    return res.status(400).json({ error: { message: "Please Enter first Name, last Name, email, address, gender, date Of Birth, phone Number, city, country" } }) 
                
                const user = await User.findOne({ email});
                const patient = await Patient.findOne({ userId:user?._id });

                if (user && patient) return res.status(409).json({ error: { message: "Patient Already Exist." } })
                
                if (user && !patient) {
                    const newPatient = new Patient ();
                    newPatient.userId= user._id as unknown as string;
                    await newPatient.save();
                    user.hashedPassword = null;
                    if(user.role === 'basic') user.role = "patient";
                    const responseObj = { "patient": user };
                    return res.status(201).json(responseObj);

                }

                if (!user && ! patient) {
                    const newUser = new User();
                    newUser.firstName= firstName;
                    newUser.lastName= lastName;
                    newUser.email=email;
                    newUser.addresses.push(address);
                    newUser.gender=gender;
                    newUser.dateOfBirth=dateOfBirth;
                    newUser.phoneNumbers.push(phoneNumber);
                    newUser.city= city;
                    newUser.country=country;
                    newUser.hashedPassword = generate("patient123");
                    newUser.role = 'patient';
                    await newUser.save();
                    const newPatient = new Patient ();
                    newPatient.userId= newUser._id as unknown as string;
                    await newPatient.save();
                    newUser.hashedPassword= null;
                    const responseObj= {"patient":newUser}
                    return res.status(201).json(responseObj) 

                }
                }

            return res.status(401).json({ error: { message: "Unauthorized Access." } }) 
        }
        catch (err: any) {
            const errorMessage: string = (err as Error).message;
            logger.error(errorMessage);
            return res.status(500).json({ errorMessage });
        }
        
    }
    update(req: Request, res: Response):Promise<Response>{
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
  
}



export { PatientController };
