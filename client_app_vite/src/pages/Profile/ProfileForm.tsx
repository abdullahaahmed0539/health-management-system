import React, { useState } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};

const ProfileForm = (props: Props) => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
  };

  return (
    <Form>
      <div className="row">
        <Stack gap={2}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
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
                  required
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control required type="text" placeholder="Enter address" />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="Enter city" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
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
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Gender</Form.Label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="RadioGender"
                  id="gender"
                />
                <label className="form-check-label" htmlFor="genderFemale">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="RadioGender"
                  id="gender"
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
              required
              type="text"
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter designation"
            />
          </Form.Group>
        </Stack>
      </div>
    </Form>
  );
};

export default ProfileForm;
