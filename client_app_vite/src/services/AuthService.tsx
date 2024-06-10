import axios from "axios";
import { handleError } from "../utilities/ErrorHandler";
import { UserProfileToken } from "../models/User";
const api = "http://localhost:5000/api/";

export const loginApi = async (email: string, password: string) => {
    try{
        const data = await axios.post<UserProfileToken>(api + "account/login", 
        {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerApi = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", 
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}