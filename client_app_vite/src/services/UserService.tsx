import axios from "axios";
import { handleError } from "../utilities/ErrorHandler";
import { RawProfileData } from "../models/User";
const api = "http://localhost:5001/api/v1/";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get<RawProfileData[]>(api + "users", config);
    console.log(localStorage.getItem("token"));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
      return []
      
    } else {
      console.error("unexpected error: ", error);
      return []
    }
  }
};
