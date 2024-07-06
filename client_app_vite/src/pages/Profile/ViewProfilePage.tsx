import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import ProfileForm from "../../components/ProfileForm";
import { Profile } from "../../models/User";

const ViewProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get<Profile>(
          `http://localhost:5001/api/v1/users/${userId}`,
          config
        );
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleUpdate = (updatedUser: Profile) => {
    setUser(updatedUser);
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

  if (!user) {
    return (
      <Container>
        <Alert variant="warning">User not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileForm user={user} onUpdate={handleUpdate} />
    </Container>
  );
};

export default ViewProfilePage;
