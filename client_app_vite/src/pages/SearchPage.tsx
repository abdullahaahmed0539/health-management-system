import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { RawProfileData, Tag } from "../models/User";
import UserList from "../components/UserList";
import { fetchUsers } from "../services/UserService";
import { set } from "react-hook-form";

interface Props {}

const SearchPage = (props: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <div className="mx-4">
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <UserList />
        </Row>
      </Form>
    </div>
  );
};

export default SearchPage;
