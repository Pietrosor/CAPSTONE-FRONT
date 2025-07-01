import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

export default function FooterComponent() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>CAPSTONE-FRONT</h5>
            <p>Costruito con React, Vite e React-Bootstrap.</p>
          </Col>
          <Col md={4}>
            <h5>Link utili</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <small>© {currentYear} CAPSTONE-FRONT</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
