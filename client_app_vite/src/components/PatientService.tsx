import axios from 'axios';

const apiBaseUrl = 'http://localhost:5001/api';

export const fetchPatients = async () => {
    return axios.get(`${apiBaseUrl}/patients`).then(res => res.data);
};

export const fetchPatientById = async (id: number) => {
    return axios.get(`${apiBaseUrl}/patients/${id}`).then(res => res.data);
};

export const addPatient = async (patientData: any) => {
    return axios.post(`${apiBaseUrl}/patients`, patientData).then(res => res.data);
};

export const updatePatient = async (id: number, patientData: any) => {
    return axios.put(`${apiBaseUrl}/patients/${id}`, patientData).then(res => res.data);
};

export const deletePatient = async (id: number) => {
    return axios.delete(`${apiBaseUrl}/patients/${id}`);
};


