import React, { useEffect, useState } from 'react';
import { fetchPatients, deletePatient } from '../services/PatientService';
import { Link, useNavigate } from 'react-router-dom';

interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
}

function PatientsList() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients().then((data) => setPatients(data));
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = async (id: number) => {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Dashboard Patients</h1>
            <Link to="/patients/new">Add New Patient</Link>
            <div>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <ul>
                {filteredPatients.map(patient => (
                    <li key={patient.id}>
                        {patient.name} - <Link to={`/patients/${patient.id}`}>View Details</Link>
                        <button onClick={() => navigate(`/patients/edit/${patient.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(patient.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientsList;
