import React from "react";
import { Form, Stack } from "react-bootstrap";

type Props = {};

const ProfileForm = (props: Props) => {
  return <Form>
    <div className="row">
    <div className="col-sm">
    <Stack gap={2}>
        <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter first name" />
        </Form.Group>
    </Stack>
    </div>
    <div className="col-sm">
    <Stack gap={2}>
        <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter first name" />
        </Form.Group>
    </Stack>
    </div>
    </div>
  </Form>
};

export default ProfileForm;
