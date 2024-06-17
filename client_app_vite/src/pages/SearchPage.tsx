import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { Tag } from "../models/User";

interface Props {}

const SearchPage = (props: Props) =>  {
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
          <Col>
          <Form.Label>Role</Form.Label>
          <ReactSelect
              value={selectedTags.map((tag) => {
                return { name: tag.name, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { name: tag.name, id: tag.value };
                  })
                );
              }}
              isMulti
              required
              placeholder="Enter designations"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchPage;
