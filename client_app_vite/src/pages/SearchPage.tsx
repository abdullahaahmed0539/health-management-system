import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { RawProfileData, Tag } from "../models/User";
import UserList from "../components/UserList";
import { fetchUsers } from "../services/UserService";
import { set } from "react-hook-form";

interface Props {}

const SearchPage = () => {
  const [name, setName] = useState("");  
  const [users, setUsers] = useState([]);  
  const [isLoading, setIsLoading] = useState(false); 
  const handleInputChange = (event) => {
      setName(event.target.value);
  };


  const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
          const fetchedUsers = await fetchUsers(name);  
          setUsers(fetchedUsers);
      } catch (error) {
          console.error('Failed to find user:', error);
          setUsers([]);  
      } finally {
          setIsLoading(false);
      }
  };

  return (
      <div className="mx-4">
          <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
                  <Col>
                      <Form.Group controlId="name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleInputChange} />
                      </Form.Group>
                  </Col>
              </Row>
              <Button variant="primary" type="submit" disabled={isLoading}>
                  Search
              </Button>
              {isLoading ? <p>Loading...</p> : <UserList users={users} />}
          </Form>
      </div>
  );
};

export default SearchPage;