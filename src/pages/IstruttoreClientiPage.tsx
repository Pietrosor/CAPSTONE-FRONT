// src/pages/IstruttoreClientiPage.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface ClienteDto {
  id: number
  username: string
  nome?: string // se il DTO contiene anche nome
}

export default function IstruttoreClientiPage() {
  const { user } = useAuth()
  const [clienti, setClienti] = useState<ClienteDto[]>([])
  const [liberi, setLiberi] = useState<ClienteDto[]>([])
  const [selId, setSelId] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Carica clienti assegnati e liberi al mount e ad ogni cambio di token
  useEffect(() => {
    if (!user?.token) return
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    }

    fetch("/api/istruttore/clienti", { headers })
      .then((r) => r.json())
      .then(setClienti)
      .catch((e) => setError(e.message))

    fetch("/api/istruttore/clienti/liberi", { headers })
      .then((r) => r.json())
      .then(setLiberi)
      .catch((e) => setError(e.message))
  }, [user?.token])

  const handleAssegna = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selId || !user?.token) return

    try {
      const res = await fetch(`/api/istruttore/clienti/${selId}/assegna`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (!res.ok) throw new Error("Assegnazione fallita")

      const cliente = liberi.find((c) => c.id === selId)
      if (cliente) {
        setClienti((old) => [...old, cliente])
        setLiberi((old) => old.filter((c) => c.id !== selId))
        setSelId(0)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">I tuoi clienti</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.username}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/istruttore/clienti/${c.id}/schede`)}
                >
                  Schede
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mb-3">Prendi in carico un nuovo cliente</h3>
      <form
        className="d-flex gap-2 align-items-center"
        onSubmit={handleAssegna}
      >
        <select
          className="form-select w-auto"
          value={selId}
          onChange={(e) => setSelId(Number(e.target.value))}
        >
          <option value={0}>— Seleziona cliente —</option>
          {liberi.map((c) => (
            <option key={c.id} value={c.id}>
              {c.username}
              {c.nome ? ` (${c.nome})` : ""}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="btn btn-success"
          disabled={selId === 0}
        >
          Prendi in carico
        </button>
      </form>
    </div>
  )
}
