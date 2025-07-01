import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

export default function FooterComponent() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-warning py-4 mt-auto">
      <Container fluid>
        <Row>
          <Col md={4}>
            <h5>VIENI A TROVARCI</h5>
            <p>Via dello Sport 69</p>
          </Col>
          <Col md={4}>
            <h5>Link utili</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-warning" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-warning" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-warning" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <small>© {currentYear} PALETRA SORBO</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
