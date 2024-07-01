import React, { useState, useEffect } from 'react';

type Patient = {
    id: string;
    name: string;
    age: number;
    medicalHistory: string;
}

const EditPatientPage = () => {
    const [patient, setPatient] = useState<Patient>({ id: '', name: '', age: 0, medicalHistory: '' });


    useEffect(() => {
       
        setPatient({ id: '123', name: 'John Doe', age: 30, medicalHistory: 'No prior issues' });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting', patient);
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input name="name" value={patient.name} onChange={handleChange} />

            <label htmlFor="age">Age:</label>
            <input name="age" type="number" value={patient.age.toString()} onChange={handleChange} />

            <label htmlFor="medicalHistory">Medical History:</label>
            <textarea name="medicalHistory" value={patient.medicalHistory} onChange={handleChange} />

            <button type="submit">Update Patient</button>
        </form>
    );
}

export default EditPatientPage;
