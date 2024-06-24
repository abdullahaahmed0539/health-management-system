import axios from "axios";
import { handleError } from "../utilities/ErrorHandler";
import { RawProfileData } from "../models/User";
const api = "http://localhost:5001/api/v1/";

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<RawProfileData[]>(api + "users", config);
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

export const getUserById = async (id: number) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<RawProfileData[]>(api + `users/${id}`, config);
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

//create user?

export const updateUser = async (id: number, user: RawProfileData) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //user object
    const response = await axios.put<RawProfileData[]>(api + `users/${id}`, config);
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

export const deleteUser = async (id: number) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //user object
    const response = await axios.delete(api + `users/${id}`, config);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
      return error.response?.status
    } else {
      console.error("unexpected error: ", error);
      return error
    }
  }
};