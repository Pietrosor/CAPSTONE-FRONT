import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useExerciseSearch } from "../services/useExerciseSearch"
import type { Exercise } from "../services/exerciseDB"
import { createSchedaForCliente } from "../services/istruttore"
import type { SchedaDto } from "../types/scheda"

export default function CreateSchedaPage() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [titolo, setTitolo] = useState("")
  const [descrizione, setDescrizione] = useState("")
  const [query, setQuery] = useState("")
  const { results, loading: loadingSearch } = useExerciseSearch(query)
  const [selezionati, setSelezionati] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addEsercizio = (e: Exercise) => {
    if (!selezionati.some((x) => x.id === e.id)) {
      setSelezionati((old) => [...old, e])
      setQuery("")
    }
  }

  const removeEsercizio = (id: string) => {
    setSelezionati((old) => old.filter((x) => x.id !== id))
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setError(null)

    if (!titolo.trim()) {
      setError("Devi inserire un titolo")
      return
    }

    if (!clienteId) {
      setError("Cliente ID non trovato")
      return
    }

    const clienteIdNum = Number(clienteId)
    if (isNaN(clienteIdNum) || clienteIdNum <= 0) {
      setError("Cliente ID non valido")
      return
    }

    if (selezionati.length === 0) {
      setError("Devi selezionare almeno un esercizio")
      return
    }

    setLoading(true)
    try {
      console.log("🔄 Creazione scheda per cliente:", clienteId)
      console.log("📋 Dati da inviare:", {
        titolo,
        descrizione,
        eserciziIds: selezionati.map((x) => x.id),
      })

      const nuova: SchedaDto = await createSchedaForCliente(clienteId, {
        titolo,
        descrizione,
        eserciziIds: selezionati.map((x) => x.id),
      })

      console.log("✅ Scheda creata con successo:", nuova)
      navigate(`/istruttore/clienti/${clienteId}/schede`)
    } catch (err: any) {
      console.error("❌ Errore completo:", err)

      if (err.message?.includes("404")) {
        setError("Cliente non trovato o non autorizzato")
      } else if (err.message?.includes("400")) {
        setError("Dati non validi. Controlla tutti i campi")
      } else if (err.message?.includes("403")) {
        setError("Non hai i permessi per creare schede per questo cliente")
      } else if (err.message?.includes("500")) {
        setError("Errore interno del server. Riprova più tardi")
      } else {
        setError(err.message || "Errore durante il salvataggio della scheda")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Crea scheda per cliente #{clienteId}</h2>

      {error && (
        <div className="alert alert-danger">
          <strong>Errore:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titolo *</label>
          <input
            className="form-control"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            placeholder="Inserisci il titolo della scheda"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrizione (opzionale)</label>
          <textarea
            className="form-control"
            rows={3}
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            placeholder="Descrivi la scheda di allenamento..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cerca esercizi</label>
          <input
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Es. bench press, squat, deadlift..."
          />
          {loadingSearch && (
            <small className="text-muted">Caricamento esercizi…</small>
          )}

          {results.length > 0 && (
            <ul
              className="list-group mt-2"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {results.map((e) => (
                <li
                  key={e.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{e.name}</span>
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      selezionati.some((x) => x.id === e.id)
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => addEsercizio(e)}
                    disabled={selezionati.some((x) => x.id === e.id)}
                  >
                    {selezionati.some((x) => x.id === e.id)
                      ? "✓ Aggiunto"
                      : "+ Aggiungi"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">
            Esercizi selezionati ({selezionati.length})
          </label>
          {selezionati.length === 0 ? (
            <div className="alert alert-info">
              Nessun esercizio selezionato. Cerca e aggiungi esercizi per creare
              la scheda.
            </div>
          ) : (
            <ul className="list-group">
              {selezionati.map((e) => (
                <li
                  key={e.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{e.name}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeEsercizio(e.id)}
                  >
                    🗑️ Rimuovi
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !titolo.trim() || selezionati.length === 0}
          >
            {loading ? "Salvataggio in corso..." : "Crea Scheda"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/istruttore/clienti/${clienteId}/scheda`)}
            disabled={loading}
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  )
}
