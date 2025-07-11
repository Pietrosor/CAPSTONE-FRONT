import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

interface Esercizio {
  nome: string
  ripetizioni: number
}

interface Scheda {
  id: number
  esercizi: Esercizio[]
  // altri campi...
}

export default function ClienteDashboard() {
  const { user } = useAuth()
  const [scheda, setScheda] = useState<Scheda | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    fetch("/api/cliente/schede", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore caricamento scheda")
        return res.json()
      })
      .then((data: Scheda | Scheda[]) => {
        console.log("Raw scheda data:", data)

        // Se l'API torna un array, prendi la prima scheda
        const loaded: Scheda =
          Array.isArray(data) && data.length > 0 ? data[0] : (data as Scheda)

        setScheda(loaded)
      })
      .catch((err) => {
        console.error(err)
        setScheda(null)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null // o Redirect

  if (loading) {
    return <div className="alert alert-info">Caricamento in corso…</div>
  }

  // Nessuna scheda restituita
  if (!scheda || !scheda.esercizi || scheda.esercizi.length === 0) {
    return (
      <>
        <h1 className="mb-4">Benvenuto, {user.username}!</h1>
        <div className="alert alert-warning">
          Nessuna scheda trovata. Rivolgiti al tuo istruttore.
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="mb-4">Benvenuto, {user.username}!</h1>
      <h2>La tua scheda di allenamento</h2>
      <ul className="list-group">
        {scheda.esercizi.map((e, i) => (
          <li key={i} className="list-group-item">
            {e.nome}: {e.ripetizioni} ripetizioni
          </li>
        ))}
      </ul>
    </>
  )
}
