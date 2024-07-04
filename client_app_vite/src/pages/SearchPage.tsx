import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Profile } from "../models/User";
import { UserRole } from "../models/Roles";
import { getUserFromLocalStorage } from "../utilities/LocalStorageUtils";
import UserList from "../components/UserList";

const SearchPage: React.FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = getUserFromLocalStorage();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get<Profile[]>(
          "http://localhost:5001/api/v1/users",
          config
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:5001/api/v1/users/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user.");
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

  return (
    <Container>
      <UserList
        users={users}
        currentUserRole={currentUser?.role as UserRole}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default SearchPage;
