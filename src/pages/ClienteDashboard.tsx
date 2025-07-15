import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

interface EsercizioDto {
  id: string
  name: string
  bodyPart: string
  equipment: string
  gifUrl: string
}

interface SchedaDto {
  id: number
  titolo: string
  descrizione: string
  dataCreazione: string
  esercizi: EsercizioDto[]
}

export default function ClienteDashboard() {
  const { user } = useAuth()
  const [schede, setSchede] = useState<SchedaDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    fetch("/api/cliente/schede", {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore HTTP ${res.status}`)
        return res.json() as Promise<SchedaDto[]>
      })
      .then((data) => {
        console.log("Raw schede:", data)
        setSchede(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null
  if (loading) return <div>Caricamento in corso…</div>
  if (error) return <div style={{ color: "red" }}>{error}</div>

  return (
    <div>
      <h1>Benvenuto, {user.username}!</h1>
      {schede.length === 0 && (
        <div className="alert alert-warning">
          Nessuna scheda trovata. Rivolgiti al tuo istruttore.
        </div>
      )}
      {schede.map((s) => (
        <div key={s.id} className="mb-4">
          <h2>{s.titolo}</h2>
          <p>{s.descrizione}</p>
          {s.esercizi.length === 0 ? (
            <p>Nessun esercizio assegnato.</p>
          ) : (
            <ul className="list-group">
              {s.esercizi.map((e) => (
                <li key={e.id} className="list-group-item">
                  {e.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
