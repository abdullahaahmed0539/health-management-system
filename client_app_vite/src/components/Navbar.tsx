import React from 'react'
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <NavbarBs className='bg-white shadow-sm mb-3'>
        <Container>
          <Nav className='me-auto'>
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/search" as={NavLink}>Search</Nav.Link>
            <Nav.Link to="login" as={NavLink}>Login</Nav.Link>
            <Nav.Link to="/signup" as={NavLink}>SignUp</Nav.Link>
          </Nav>
        </Container>
    </NavbarBs>
  )
}

export default Navbar