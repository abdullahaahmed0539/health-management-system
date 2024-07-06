import React from "react";
import { Table, Button, Container, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Profile } from "../models/User";
import { UserRole } from "../models/Roles";

interface UserListProps {
  users: Profile[];
  currentUserRole: UserRole;
  handleDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, currentUserRole, handleDelete }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const canDeleteOrView = (role: UserRole) => {
    return role === UserRole.Admin;
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/userprofile/${userId}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2>User List</h2>
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
            <th>Email</th>
            <th>Role</th>
            {canDeleteOrView(currentUserRole) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {canDeleteOrView(currentUserRole) && (
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    className="ms-2"
                    onClick={() => handleViewProfile(user._id)}
                  >
                    View
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
