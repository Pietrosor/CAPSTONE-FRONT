import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useExerciseSearch } from "../services/useExerciseSearch"
import type { Exercise } from "../services/exerciseDB"
import { createScheda } from "../services/istruttore"
import { assignSchedaToCliente } from "../services/assignSchedaService"
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

    setLoading(true)
    try {
      const nuova: SchedaDto = await createScheda(clienteId!, {
        titolo,
        descrizione,
        eserciziIds: selezionati.map((x) => x.id),
      })
      console.log("Scheda creata:", nuova)

      const associata: SchedaDto = await assignSchedaToCliente(
        nuova.id.toString(),
        clienteId!
      )
      console.log("Scheda associata:", associata)

      navigate(`/istruttore/clienti/${clienteId}/scheda`)
    } catch (err: any) {
      console.error("Errore creazione/associazione:", err)
      setError(err.message || "Errore durante il salvataggio")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Crea scheda per cliente #{clienteId}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label className="form-label">Cerca esercizi</label>
          <input
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Es. bench press"
          />
          {loadingSearch && <small>Caricamento esercizi…</small>}

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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Salvataggio…" : "Salva scheda"}
        </button>
      </form>
    </div>
  )
}
