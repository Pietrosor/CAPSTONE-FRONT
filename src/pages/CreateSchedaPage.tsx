import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useExerciseSearch } from "../services/useExerciseSearch"
import type { Exercise } from "../services/exerciseDB"
import { createScheda } from "../services/istruttore"

export default function CreateSchedaPage() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [titolo, setTitolo] = useState("")
  const [descrizione, setDescrizione] = useState("")
  const [query, setQuery] = useState("")
  const { results, loading } = useExerciseSearch(query)
  const [selezionati, setSelezionati] = useState<Exercise[]>([])
  const [error, setError] = useState<string | null>(null)

  const addEsercizio = (e: Exercise) => {
    if (!selezionati.find((x) => x.id === e.id)) {
      setSelezionati((old) => [...old, e])
      setQuery("")
    }
  }

  const removeEsercizio = (id: string) => {
    setSelezionati((old) => old.filter((x) => x.id !== id))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titolo.trim() || selezionati.length === 0) return
    try {
      await createScheda(clienteId!, {
        titolo,
        descrizione,
        eserciziIds: selezionati.map((x) => x.id),
      })
      navigate(`/istruttore/clienti/${clienteId}/schede`)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Crea scheda per cliente #{clienteId}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            className="form-control"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
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
          />
        </div>

        {/* Ricerca esercizi */}
        <div className="mb-3">
          <label className="form-label">Cerca esercizi</label>
          <input
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Es. bench press"
          />
          {loading && <small>Caricamento catalogo esercizi…</small>}

          <ul className="list-group mt-2">
            {results.map((e) => (
              <li
                key={e.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{e.name}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                  onClick={() => addEsercizio(e)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label className="form-label">Esercizi scelti</label>
          {selezionati.length === 0 ? (
            <p className="text-muted">Nessun esercizio aggiunto.</p>
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
                    className="btn btn-sm btn-danger"
                    onClick={() => removeEsercizio(e.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!titolo.trim() || selezionati.length === 0}
        >
          Salva scheda
        </button>
      </form>
    </div>
  )
}
