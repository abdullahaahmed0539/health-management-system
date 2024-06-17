import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export type Role = "Admin" | "Doctor" | "Staff" | "Patient";

interface RoleDropdownProps {
  onSelectRole: (role: Role) => void;
}

const RoleDropdown = ({ onSelectRole }: RoleDropdownProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      const role = eventKey as Role;
      setSelectedRole(role);
      onSelectRole(eventKey as Role);
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedRole ? selectedRole : "Select Role"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
        <Dropdown.Item eventKey="Doctor">Doctor</Dropdown.Item>
        <Dropdown.Item eventKey="Staff">Staff</Dropdown.Item>
        <Dropdown.Item eventKey="Patient">Patient</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RoleDropdown;
