import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

interface SignupForm {
  username: string
  password: string
  role: "cliente" | "istruttore"
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>({
    username: "",
    password: "",
    role: "cliente",
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange: React.ChangeEventHandler<any> = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          role: form.role.toUpperCase(),
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }
      navigate("/login", { replace: true })
    } catch (err: any) {
      setError(err.message || "Errore di registrazione")
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="w-100 px-3" style={{ maxWidth: 400 }}>
          <h2 className="mb-4 text-center">Iscriviti</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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

            <Form.Group className="mb-3" controlId="signupRole">
              <Form.Label>Seleziona il tuo ruolo</Form.Label>
              <Form.Select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="cliente">Cliente</option>
                <option value="istruttore">Istruttore</option>
              </Form.Select>
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
    </div>
  )
}
