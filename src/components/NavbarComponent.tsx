import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-costum">
      <Container fluid>
        <Navbar.Brand className="text-warning" as={Link} to="/">
          PALESTRA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="me-auto ">
            <Nav.Link className="text-warning" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="text-warning" as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown
              title={<span className="text-warning">More</span>}
              id="dropdown-nav"
              menuVariant="dark"
            >
              <NavDropdown.Item
                className="text-warning"
                as={Link}
                to="/action1"
              >
                Action 1
              </NavDropdown.Item>
              <NavDropdown.Item
                className="text-warning"
                as={Link}
                to="/action2"
              >
                Action 2
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="text-warning" as={Link} to="/login">
              Log in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
