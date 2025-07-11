import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [creds, setCreds] = useState({ username: "", password: "" })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Errore login")
      }
      const data: { token: string; username: string; role: string } =
        await res.json()

      login({
        token: data.token,
        username: data.username,
        role: data.role,
      })

      if (data.role === "ISTRUTTORE") {
        navigate("/istruttore/clienti")
      } else {
        navigate("/cliente/dashboard")
      }
    } catch (err) {
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
                name="username"
                value={creds.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={creds.password}
                onChange={handleChange}
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
