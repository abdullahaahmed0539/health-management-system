import React, { useEffect, useState } from 'react';
import { fetchPatientById, deletePatient } from '../services/PatientService';
import { useParams, useHistory, Link } from 'react-router-dom';

function PatientDetails() {
    const [patient, setPatient] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetchPatientById(id).then(setPatient);
    }, [id]);

    const handleDelete = () => {
        deletePatient(id).then(() => {
            alert('Patient deleted');
            history.push('/patients');
        });
    };

    return (
        <div>
            {patient ? (
                <>
                    <h1>{patient.name}</h1>
                    <p>Date of Birth: {patient.dateOfBirth}</p>
                    <button onClick={handleDelete}>Delete</button>
                    <Link to={`/patients/${id}/edit`}>Edit</Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PatientDetails;
