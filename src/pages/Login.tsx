import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

interface LoginResponse {
  token: string
  role: "CLIENTE" | "ISTRUTTORE"
}

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }
      const data = (await res.json()) as LoginResponse

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)

      navigate("/clienti", { replace: true })
    } catch (err: any) {
      setError("Credenziali errate")
    }
  }

  return (
    <div className="d-flex flex-column vh-100">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container px-3" style={{ maxWidth: "400px" }}>
          <h2 className="mb-4 text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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
    </div>
  )
}
