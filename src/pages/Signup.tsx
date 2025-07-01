// src/pages/Signup.tsx
import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

interface SignupForm {
  username: string
  password: string
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>({ username: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup data:", form)
    navigate("/login", { replace: true })
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="w-100 px-3" style={{ maxWidth: 400 }}>
          <h2 className="mb-4 text-center">Iscriviti</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Scegli uno username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Scegli una password"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Registrati
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Hai già un account? <Link to="/login">Accedi</Link>
          </p>
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}
