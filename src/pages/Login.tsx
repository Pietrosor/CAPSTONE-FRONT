import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

interface LoginForm {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login data:", form)
    navigate("/", { replace: true })
  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Inserisci username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Inserisci password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Accedi
        </Button>
      </Form>

      <p className="mt-3">
        Non hai un account? <Link to="/signup">Iscriviti</Link>
      </p>
    </>
  )
}
