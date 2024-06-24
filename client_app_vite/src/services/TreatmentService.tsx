import axios from "axios";
import { handleError } from "../utilities/ErrorHandler";
import { Treatment } from "../models/Treatment";
const api = "http://localhost:5001/api/v1/";

//getAllTreatments?

export const getAllTreatmentsById = async (patientId: number) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<Treatment[]>(api + `patients/${patientId}/treatments`, config);
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

export const getTreatmentbyId = async (patientId: number, treatmentId: number) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<Treatment[]>(api + `patients/${patientId}/treatments/${treatmentId}`, config);
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

export const createTreatment = async (patientId: number, treatment: Treatment) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //treatmentobject
    const response = await axios.put(api + `patients/${patientId}`, config);
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

export const updatePatientTreatment = async (patientId: number, treatmentId: number, treatment: Treatment) => {
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      //treatmentobject
      const response = await axios.put<Treatment[]>(api + `patients/${patientId}/treatments/${treatmentId}`, config);
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

export const deletePatientTreatment = async (patientId: number, treatmentId: number) => {
  try {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(api + `patients/${patientId}/treatments/${treatmentId}`, config);
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