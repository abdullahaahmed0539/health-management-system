import axios from 'axios';

const apiBaseUrl = ' '; // Change to ctual API URL

export const fetchPatients = async () => {
    return axios.get(`${apiBaseUrl}/patients`).then(res => res.data);
};

export const fetchPatientById = async (id) => {
    return axios.get(`${apiBaseUrl}/patients/${id}`).then(res => res.data);
};

export const addPatient = async (patientData) => {
    return axios.post(`${apiBaseUrl}/patients`, patientData).then(res => res.data);
};

export const updatePatient = async (id, patientData) => {
    return axios.put(`${apiBaseUrl}/patients/${id}`, patientData).then(res => res.data);
};

export const deletePatient = async (id) => {
    return axios.delete(`${apiBaseUrl}/patients/${id}`);
};
