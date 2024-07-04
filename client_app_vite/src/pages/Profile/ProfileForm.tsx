import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Form, Col, Row, Container, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import axios from "axios";
import { Profile } from "../../models/User";
import { UserRole } from "../../models/Roles";

interface ProfileFormProps {
  user?: Profile;
  onUpdate: (updatedUser: Profile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState<Profile | undefined>(user);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      if (!prevProfile) return prevProfile;

      if (name.startsWith("address") && index !== undefined) {
        const updatedAddress = [...prevProfile.address];
        updatedAddress[index] = value;
        return { ...prevProfile, address: updatedAddress };
      }

      return { ...prevProfile, [name]: value };
    });
  };

  const handleDesignationChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    const updatedDesignation = newValue.map((item) => item.value);
    setProfile((prevProfile) => prevProfile ? { ...prevProfile, designation: updatedDesignation } : prevProfile);
  };

  const toggleEdit = () => setIsEditable(!isEditable);

  const saveProfile = async () => {
    if (!profile) return;

    try {
      const _id = localStorage.getItem("_id");
      console.log("profile", profile);
      const response = await axios.put(
        `https://localhost:5001/users/${_id}`,
        profile
      );

      setIsEditable(false);
      onUpdate(response.data); // Update the parent component state with the updated user data
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const cancelEdit = () => {
    setProfile(user);
    setIsEditable(false);
  };

  const canEditField = (field: string) => {
    if (!profile) return false;
    const role = profile.role as UserRole;

    switch (role) {
      case UserRole.Admin:
        return true;
      case UserRole.Doctor:
      case UserRole.Staff:
        return !["role", "firstName", "lastName", "email"].includes(field);
      case UserRole.Guest:
        return ["address", "city", "country", "dateOfBirth", "gender", "phone"].includes(field);
      default:
        return false;
    }
  };

  return (
    <Container>
      <h2>My Profile</h2>
      <Form>
        <Stack gap={2}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={profile?.role}
                  onChange={handleChange}
                  disabled={!isEditable || !canEditField("role")}
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Staff">Staff</option>
                  <option value="Patient">Patient</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={profile?.firstName}
                  onChange={handleChange}
                  readOnly={!isEditable || !canEditField("firstName")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profile?.lastName}
                  onChange={handleChange}
                  readOnly={!isEditable || !canEditField("lastName")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profile?.email}
              onChange={handleChange}
              readOnly={!isEditable || !canEditField("email")}
            />
          </Form.Group>

          {(profile?.address ?? [""]).map((address, index) => (
            <Form.Group
              className="mb-3"
              controlId={`formAddress${index}`}
              key={index}
            >
              <Form.Label>Address {index + 1}</Form.Label>
              <Form.Control
                type="text"
                name={`address${index}`}
                value={address}
                onChange={(e) => handleChange(e, index)}
                readOnly={!isEditable || !canEditField("address")}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={profile?.city}
              onChange={handleChange}
              readOnly={!isEditable || !canEditField("city")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={profile?.country}
              onChange={handleChange}
              readOnly={!isEditable || !canEditField("country")}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={profile?.dateOfBirth}
                  onChange={handleChange}
                  readOnly={!isEditable || !canEditField("dateOfBirth")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    value="Male"
                    checked={profile?.gender === "Male"}
                    onChange={handleChange}
                    disabled={!isEditable || !canEditField("gender")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={profile?.gender === "Female"}
                    onChange={handleChange}
                    disabled={!isEditable || !canEditField("gender")}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={profile?.phone}
              onChange={handleChange}
              readOnly={!isEditable || !canEditField("phone")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDesignation">
            <Form.Label>Designations</Form.Label>
            <CreatableSelect
              isMulti
              value={(profile?.designation ?? []).map((designation) => ({
                label: designation,
                value: designation,
              }))}
              onChange={handleDesignationChange}
              isDisabled={!isEditable || !canEditField("designation")}
            />
          </Form.Group>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button
            variant="primary"
            onClick={isEditable ? saveProfile : toggleEdit}
          >
            {isEditable ? "Save" : "Change"}
          </Button>
          {isEditable && (
            <Button variant="secondary" onClick={cancelEdit} className="ms-2">
              Cancel
            </Button>
          )}
        </Stack>
      </Form>
    </Container>
  );
};

export default ProfileForm;
