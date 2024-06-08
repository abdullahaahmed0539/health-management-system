import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
    if (!req.headers.authorization) throw new Error("No access token found.");    
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = jwt.verify(token, process.env.JWT_PVT_KEY as string);
    if (!verifiedUser) throw new Error("Access denied.");
    next();
  } catch (err: any) {
    return res.status(401).json({ error: { message: err.message } });
  }
};

export default checkAuth;
