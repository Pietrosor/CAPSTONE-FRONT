// src/pages/ClientiPage.tsx
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Cliente {
  id: number
  username: string
}

export default function ClientiPage() {
  const [clients, setClients] = useState<Cliente[]>([])
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) return
    fetch("/api/istruttore/clienti", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}`)
        return res.json()
      })
      .then(setClients)
      .catch((err) => setError(err.message))
  }, [token])

  if (error) {
    return (
      <div className="container">
        <p className="text-danger">Errore: {error}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="mb-3">I tuoi Clienti</h2>
      <ul className="list-group">
        {clients.map((c) => (
          <li
            key={c.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {c.username}
            <div>
              <Link
                to={`/clienti/${c.id}/crea-scheda`}
                className="btn btn-sm btn-primary me-2"
              >
                Crea Scheda
              </Link>
              <Link
                to={`/clienti/${c.id}/schede`}
                className="btn btn-sm btn-outline-secondary"
              >
                Vedi Schede
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
