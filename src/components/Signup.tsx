import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CLIENTE",
  })
  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        role: form.role,
      }),
    })
    navigate("/login")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="CLIENTE">Cliente</option>
        <option value="ISTRUTTORE">Istruttore</option>
      </select>
      <button type="submit">Registrati</button>
    </form>
  )
}

export default Signup
