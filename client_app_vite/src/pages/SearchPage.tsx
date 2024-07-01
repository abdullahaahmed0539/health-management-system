import React, { useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import UserList from "../components/UserList";
import { fetchUsers } from "../services/UserService";

const SearchPage = () => {
    const [name, setName] = useState("");  
    const [users, setUsers] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState(null); 

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const fetchedUsers = await fetchUsers(name); 
            setUsers(fetchedUsers);
            if (fetchedUsers.length === 0) {
                setError("No users found.");
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users.');
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
                {isLoading && <p>Loading...</p>}
                {error && <Alert variant="danger">{error}</Alert>}
                <UserList users={users} />
            </Form>
        </div>
    );
};

export default SearchPage;
