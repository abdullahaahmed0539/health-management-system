import React, { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { ProfileData, Tag } from "../../models/User";
import RoleDropdown, { Role } from "../../components/RoleDropdown";
import { v4 as uuidV4 } from "uuid";

type ProfileFormProps = {
  onSubmit: (data: ProfileData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<ProfileData>;

const ProfileForm = ({
  onSubmit,
  onAddTag,
  availableTags,
}: ProfileFormProps) => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const designationsRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    if (dateOfBirthRef.current) {
      dateOfBirthRef.current.value = date
        ? date.toISOString().split("T")[0]
        : "";
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      role: roleRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      address: addressRef.current!.value,
      city: cityRef.current!.value,
      country: countryRef.current!.value,
      dateOfBirth: dateOfBirthRef.current!.value,
      gender: genderMaleRef.current!.checked
        ? "Male"
        : genderFemaleRef.current!.checked
        ? "Female"
        : "",
      phoneNumber: phoneNumberRef.current!.value,
      designations: [],
      email: emailRef.current!.value,
    });
    console.log({
      role: roleRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      address: addressRef.current!.value,
      city: cityRef.current!.value,
      country: countryRef.current!.value,
      dateOfBirth: dateOfBirthRef.current!.value,
      gender: genderMaleRef.current!.checked
        ? "Male"
        : genderFemaleRef.current!.checked
        ? "Female"
        : "",
      phoneNumber: phoneNumberRef.current!.value,
      designations: [],
      email: emailRef.current!.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <Stack gap={2}>
          <Row>
            <Col>
              <Form.Group className="mb-1" controlId="firstName">
                <Form.Label>Role</Form.Label>
                <RoleDropdown onSelectRole={handleSelectRole} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  ref={firstNameRef}
                  required
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  ref={lastNameRef}
                  required
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={emailRef}
              required
              type="text"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              ref={addressRef}
              required
              type="text"
              placeholder="Enter address"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  ref={cityRef}
                  required
                  type="text"
                  placeholder="Enter city"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  ref={countryRef}
                  required
                  type="text"
                  placeholder="Enter country"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <div className="mw-100">
                  <DatePicker
                    selected={dateOfBirth}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select date of birth"
                  />
                  <input
                    ref={dateOfBirthRef}
                    type="hidden"
                    value={
                      dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""
                    }
                  />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Gender</Form.Label>
              <div className="form-check">
                <input
                  ref={genderFemaleRef}
                  className="form-check-input"
                  type="radio"
                  name="RadioGender"
                  id="genderFemale"
                />
                <label className="form-check-label" htmlFor="genderFemale">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  ref={genderMaleRef}
                  className="form-check-input"
                  type="radio"
                  name="RadioGender"
                  id="genderMale"
                />
                <label className="form-check-label" htmlFor="genderMale">
                  Male
                </label>
              </div>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              ref={phoneNumberRef}
              required
              type="text"
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="designation">
            <Form.Label>Designations</Form.Label>
            <CreateableReactSelect
              // onCreateOption={(label) => {
              //   const newTag = { id: uuidV4(), label };
              //   onAddTag(newTag);
              //   setSelectedTags((prev) => [...prev, newTag]);
              // }}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
              required
              placeholder="Enter designations"
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </div>
    </Form>
  );
};

export default ProfileForm;
