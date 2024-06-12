import React from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {};

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logoutUser } = useAuth();

  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/search" as={NavLink}>
            Search
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {isLoggedIn() ? (
            <Button onClick={logoutUser} className="ms-2">
              Logout
            </Button>
          ) : (
            <>
              <Nav.Link to="/login" as={NavLink} className="ms-2">
                Login
              </Nav.Link>
              <Nav.Link to="/signup" as={NavLink} className="ms-2">
                SignUp
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
