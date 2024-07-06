import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Patient } from "../../models/Patient";

const ViewPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Partial<Patient>>({});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get<Patient>(
          `http://localhost:5001/api/v1/patients/${id}/treatments/`,
          config
        );
        setPatient(response.data);
        setFormValues(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch patient.");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    // Placeholder for save functionality
    // You would typically make a PUT or PATCH request to update the patient's data on the server
    console.log("Save button clicked");
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put<Patient>(
        `http://localhost:5001/api/v1/patients/${id}`,
        formValues,
        config
      );
      setPatient(response.data);
      alert("Patient details updated successfully!");
    } catch (error) {
      alert("Failed to update patient details.");
    }
  };

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

  if (!patient) {
    return (
      <Container>
        <Alert variant="warning">Patient not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2>View Patient</h2>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formValues.firstName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formValues.lastName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="phoneNumbers">
          <Form.Label>Phone Numbers</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumbers"
            value={formValues.phoneNumbers?.join(", ") || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="addresses">
          <Form.Label>Addresses</Form.Label>
          <Form.Control
            type="text"
            name="addresses"
            value={formValues.addresses?.join(", ") || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            value={formValues.designation?.join(", ") || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default ViewPatientPage;
