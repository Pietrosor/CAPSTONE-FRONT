import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ username, password })
    navigate("/", { replace: true })
  }

  return (
    <div className="d-flex flex-column vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center ">
        <div className="container px-3" style={{ maxWidth: "400px" }}>
          <h2 className="mb-4 text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              Accedi
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Non hai un account? <Link to="/signup">Iscriviti</Link>
          </p>
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}
