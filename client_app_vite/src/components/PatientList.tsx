import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Patient } from "../models/Patient";
import { getUserFromLocalStorage } from "../utilities/LocalStorageUtils";

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get<Patient[]>(
          "http://localhost:5001/api/v1/patients",
          config
        );
        setPatients(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch patients.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleViewProfile = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Patient List</h2>
      <Form.Group controlId="searchBar">
        <Form.Control
          type="text"
          placeholder="Search by last name"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-3"
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewProfile(patient._id)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PatientList;
