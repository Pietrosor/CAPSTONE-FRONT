import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../api/api"

export function Login() {
  const [creds, setCreds] = useState({ username: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreds({ ...creds, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await apiFetch<{ token: string; role: string }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(creds),
        }
      )
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      navigate(
        data.role === "ISTRUTTORE" ? "/istruttore/clienti" : "/cliente/schede"
      )
    } catch (err) {
      alert("Login fallito")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={creds.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={creds.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Accedi</button>
    </form>
  )
}

export default Login
