import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { useAuth } from "../context/AuthContext"

export default function NavbarComponent() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const profilePath =
    user?.role === "CLIENTE" ? "/cliente/dashboard" : "/istruttore/clienti"
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-costum">
      <Container fluid>
        <Navbar.Brand className="text-warning" as={Link} to="/">
          PALESTRA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="me-auto">
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
              <NavDropdown.Item className="text-warning" as={Link} to="/signup">
                Unisciti a noi
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to={profilePath}
                  className="text-warning me-3"
                >
                  Ciao, <strong>{user.username}</strong>
                </Nav.Link>

                <Nav.Link
                  className="text-warning"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-warning" as={Link} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link className="text-warning" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
