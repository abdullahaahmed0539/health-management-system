import React, { useState, useEffect } from 'react';
import { addPatient, fetchPatientById, updatePatient } from '../services/PatientService';
import { useParams, useHistory } from 'react-router-dom';

function PatientForm() {
    const [patient, setPatient] = useState({
        name: '',
        dateOfBirth: '',
    });
    const { id } = useParams();
    const history = useHistory();
    const isNewPatient = !id;

    useEffect(() => {
        if (!isNewPatient) {
            fetchPatientById(id).then(setPatient);
        }
    }, [id, isNewPatient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isNewPatient ? addPatient : updatePatient;
        action(patient).then(() => {
            history.push('/patients');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" name="name" value={patient.name} onChange={handleChange} />
            </label>
            <label>Date of Birth:
                <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} />
            </label>
            <button type="submit">{isNewPatient ? 'Add' : 'Update'} Patient</button>
        </form>
    );
}

export default PatientForm;
