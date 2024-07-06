import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileForm from "../../components/ProfileForm";
import { Container, Spinner, Alert } from "react-bootstrap";
import { config } from "dotenv";
import { getUserFromLocalStorage } from "../../utilities/LocalStorageUtils";
import { Profile } from "../../models/User";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // Fetch all users data (assuming it's an array)
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get<Profile[]>(
          "http://localhost:5001/api/v1/users",
          config
        );

        // Get email from localStorage
        const user = getUserFromLocalStorage();
        const userEmail = user?.email;
        console.log("userEmail", userEmail);
        console.log("response.data", response.data);

        // Find the user with the matching email
        if (response.data) {
          const foundUser = response.data.find((u) => u.email === userEmail);
          if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("_id", foundUser._id);
            console.log("foundUser", foundUser._id);
          } else {
            setError("User not found");
          }
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
      <ProfileForm user={user} onUpdate={handleUpdate}/>
    </Container>
  );
};

export default ProfilePage;
