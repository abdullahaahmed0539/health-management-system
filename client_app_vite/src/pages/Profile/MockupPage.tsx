import React from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MockupComponent: React.FC = () => {
  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const _id = localStorage.getItem("_id");

      // JSON object to be sent
      const data = { designation: "HelloTest" };

      const response = await axios.put(
        `http://localhost:5001/api/v1/users/${_id}`,
        data,
        config
      );

      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <Container>
      <h2>Mockup Component</h2>
      <Button onClick={handleButtonClick}>Send PUT Request</Button>
    </Container>
  );
};

export default MockupComponent;
