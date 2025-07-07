import React, { useEffect, useState } from "react"

interface Scheda {
  id: number
  titolo: string
  descrizione: string
  dataCreazione: string
}

export default function LeMieSchedePage() {
  const [schede, setSchede] = useState<Scheda[]>([])
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) return
    fetch("/api/cliente/schede", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}`)
        return res.json()
      })
      .then(setSchede)
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
      <h2 className="mb-3">Le Mie Schede</h2>
      {schede.length === 0 ? (
        <p>Non hai ancora schede.</p>
      ) : (
        <ul className="list-group">
          {schede.map((s) => (
            <li key={s.id} className="list-group-item">
              <h5>{s.titolo}</h5>
              <small className="text-muted">
                {new Date(s.dataCreazione).toLocaleDateString()}
              </small>
              <p>{s.descrizione}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
