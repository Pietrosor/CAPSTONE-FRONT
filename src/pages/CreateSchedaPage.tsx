import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useExerciseSearch } from "../services/useExerciseSearch"
import type { Exercise } from "../services/exerciseDB"
import { createSchedaForCliente } from "../services/istruttore"
import type { SchedaDto } from "../types/scheda"

interface EsercizioConDettagli {
  esercizio: Exercise
  serie: number
  ripetizioni: string
  tempoRecupero?: string
  note?: string
}

interface GiornoAllenamento {
  nome: string
  esercizi: EsercizioConDettagli[]
}

const GIORNI_SETTIMANA = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
]

export default function CreateSchedaPage() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [titolo, setTitolo] = useState("")
  const [descrizione, setDescrizione] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [giorniSelezionati, setGiorniSelezionati] = useState<string[]>([])
  const [giorniAllenamento, setGiorniAllenamento] = useState<
    GiornoAllenamento[]
  >([])
  const [giornoAttivo, setGiornoAttivo] = useState<string>("")

  const [query, setQuery] = useState("")
  const { results, loading: loadingSearch } = useExerciseSearch(query)
  const [showEsercizioForm, setShowEsercizioForm] = useState(false)
  const [esercizioSelezionato, setEsercizioSelezionato] =
    useState<Exercise | null>(null)

  const [formEsercizio, setFormEsercizio] = useState({
    serie: 3,
    ripetizioni: "8-10",
    tempoRecupero: "60s",
    note: "",
  })
  const handleGiornoToggle = (giorno: string) => {
    if (giorniSelezionati.includes(giorno)) {
      setGiorniSelezionati(giorniSelezionati.filter((g) => g !== giorno))
      setGiorniAllenamento(giorniAllenamento.filter((g) => g.nome !== giorno))
    } else {
      setGiorniSelezionati([...giorniSelezionati, giorno])
      setGiorniAllenamento([
        ...giorniAllenamento,
        { nome: giorno, esercizi: [] },
      ])
    }
  }

  const handleAggiungiEsercizio = (esercizio: Exercise) => {
    if (!giornoAttivo) {
      setError("Seleziona prima un giorno cliccando sul titolo della card")
      return
    }

    setEsercizioSelezionato(esercizio)
    setShowEsercizioForm(true)
    setQuery("")
  }

  const handleConfermaEsercizio = () => {
    if (!esercizioSelezionato || !giornoAttivo) return

    const nuovoEsercizio: EsercizioConDettagli = {
      esercizio: esercizioSelezionato,
      serie: formEsercizio.serie,
      ripetizioni: formEsercizio.ripetizioni,
      tempoRecupero: formEsercizio.tempoRecupero,
      note: formEsercizio.note,
    }

    setGiorniAllenamento((giorni) =>
      giorni.map((g) =>
        g.nome === giornoAttivo
          ? { ...g, esercizi: [...g.esercizi, nuovoEsercizio] }
          : g
      )
    )

    setShowEsercizioForm(false)
    setEsercizioSelezionato(null)
    setFormEsercizio({
      serie: 3,
      ripetizioni: "8-10",
      tempoRecupero: "60s",
      note: "",
    })
  }

  const handleRimuoviEsercizio = (
    giornoNome: string,
    esercizioIndex: number
  ) => {
    setGiorniAllenamento((giorni) =>
      giorni.map((g) =>
        g.nome === giornoNome
          ? {
              ...g,
              esercizi: g.esercizi.filter((_, i) => i !== esercizioIndex),
            }
          : g
      )
    )
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setError(null)

    if (!titolo.trim()) {
      setError("Devi inserire un titolo")
      return
    }

    if (giorniAllenamento.length === 0) {
      setError("Devi selezionare almeno un giorno")
      return
    }

    if (giorniAllenamento.every((g) => g.esercizi.length === 0)) {
      setError("Devi aggiungere almeno un esercizio")
      return
    }

    setLoading(true)
    try {
      const tuttiEsercizi = giorniAllenamento.flatMap((g) =>
        g.esercizi.map((e) => e.esercizio.id)
      )

      const nuova: SchedaDto = await createSchedaForCliente(clienteId!, {
        titolo,
        descrizione:
          descrizione +
          "\n\n" +
          giorniAllenamento
            .map(
              (g) =>
                `${g.nome}:\n${g.esercizi
                  .map(
                    (e) =>
                      `- ${e.esercizio.name}: ${e.serie} serie x ${e.ripetizioni} rip`
                  )
                  .join("\n")}`
            )
            .join("\n\n"),
        eserciziIds: tuttiEsercizi,
      })

      navigate(`/istruttore/clienti/${clienteId}/schede`)
    } catch (err: any) {
      setError(err.message || "Errore durante il salvataggio della scheda")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="fas fa-plus-circle me-2"></i>
        Crea scheda per cliente #{clienteId}
      </h2>

      {error && (
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <strong>Errore:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-info-circle me-2"></i>
              Informazioni Generali
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Titolo *</label>
                <input
                  className="form-control"
                  value={titolo}
                  onChange={(e) => setTitolo(e.target.value)}
                  placeholder="Es: Scheda Forza Base"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Descrizione</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                  placeholder="Descrizione della scheda..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-calendar-week me-2"></i>
              Giorni di Allenamento
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {GIORNI_SETTIMANA.map((giorno) => (
                <div key={giorno} className="col-6 col-md-4 col-lg-3 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={giorno}
                      checked={giorniSelezionati.includes(giorno)}
                      onChange={() => handleGiornoToggle(giorno)}
                    />
                    <label className="form-check-label" htmlFor={giorno}>
                      {giorno}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-search me-2"></i>
              Ricerca Esercizi
            </h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca esercizi... (es: bench press, squat, push up)"
              />
            </div>

            {loadingSearch && (
              <div className="text-center">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Caricamento...</span>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div
                className="list-group"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {results.map((esercizio) => (
                  <button
                    key={esercizio.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => handleAggiungiEsercizio(esercizio)}
                    disabled={!giornoAttivo}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{esercizio.name}</h6>
                      <small className="text-muted">
                        {esercizio.equipment}
                      </small>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {results.length > 0 && !giornoAttivo && (
              <div className="alert alert-info mt-3">
                <i className="fas fa-info-circle me-2"></i>
                Seleziona prima un giorno per aggiungere esercizi
              </div>
            )}

            {query && results.length === 0 && !loadingSearch && (
              <div className="alert alert-warning">
                <i className="fas fa-search me-2"></i>
                Nessun esercizio trovato per "{query}"
              </div>
            )}
          </div>
        </div>

        {giorniSelezionati.length > 0 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-calendar-day me-2"></i>
                Giorno Attivo per Aggiunta Esercizi
              </h5>
            </div>
            <div className="card-body">
              <div className="btn-group" role="group">
                {giorniSelezionati.map((giorno) => (
                  <button
                    key={giorno}
                    type="button"
                    className={`btn ${
                      giornoAttivo === giorno
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setGiornoAttivo(giorno)}
                  >
                    {giorno}
                  </button>
                ))}
              </div>
              {giornoAttivo && (
                <div className="mt-2">
                  <small className="text-muted">
                    <i className="fas fa-arrow-up me-1"></i>
                    Gli esercizi verranno aggiunti al{" "}
                    <strong>{giornoAttivo}</strong>
                  </small>
                </div>
              )}
            </div>
          </div>
        )}
        {giorniAllenamento.map((giorno) => (
          <div key={giorno.nome} className="card mb-4">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                giornoAttivo === giorno.nome ? "bg-primary text-white" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setGiornoAttivo(giorno.nome)}
            >
              <h5 className="mb-0">
                <i className="fas fa-dumbbell me-2"></i>
                {giorno.nome} ({giorno.esercizi.length} esercizi)
              </h5>
              {giornoAttivo === giorno.nome && (
                <small>
                  <i className="fas fa-check-circle me-1"></i>
                  Giorno attivo
                </small>
              )}
            </div>
            <div className="card-body">
              {giorno.esercizi.length === 0 ? (
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  Nessun esercizio per questo giorno
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Esercizio</th>
                        <th>Serie</th>
                        <th>Ripetizioni</th>
                        <th>Recupero</th>
                        <th>Note</th>
                        <th>Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {giorno.esercizi.map((esercizio, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{esercizio.esercizio.name}</strong>
                            <br />
                            <small className="text-muted">
                              {esercizio.esercizio.equipment}
                            </small>
                          </td>
                          <td>
                            <span className="badge bg-primary">
                              {esercizio.serie}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-success">
                              {esercizio.ripetizioni}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-warning">
                              {esercizio.tempoRecupero}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {esercizio.note || "-"}
                            </small>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleRimuoviEsercizio(giorno.nome, index)
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}

        {showEsercizioForm && esercizioSelezionato && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-cogs me-2"></i>
                    Configura: {esercizioSelezionato.name}
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Serie</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formEsercizio.serie}
                        onChange={(e) =>
                          setFormEsercizio({
                            ...formEsercizio,
                            serie: parseInt(e.target.value),
                          })
                        }
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Ripetizioni</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formEsercizio.ripetizioni}
                        onChange={(e) =>
                          setFormEsercizio({
                            ...formEsercizio,
                            ripetizioni: e.target.value,
                          })
                        }
                        placeholder="Es: 8-10 o 12"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="form-label">Tempo Recupero</label>
                      <select
                        className="form-select"
                        value={formEsercizio.tempoRecupero}
                        onChange={(e) =>
                          setFormEsercizio({
                            ...formEsercizio,
                            tempoRecupero: e.target.value,
                          })
                        }
                      >
                        <option value="30s">30 secondi</option>
                        <option value="60s">1 minuto</option>
                        <option value="90s">1.5 minuti</option>
                        <option value="2min">2 minuti</option>
                        <option value="3min">3 minuti</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Note</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formEsercizio.note}
                        onChange={(e) =>
                          setFormEsercizio({
                            ...formEsercizio,
                            note: e.target.value,
                          })
                        }
                        placeholder="Note aggiuntive..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEsercizioForm(false)}
                  >
                    Annulla
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfermaEsercizio}
                  >
                    <i className="fas fa-check me-2"></i>
                    Aggiungi Esercizio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !titolo.trim()}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Salvataggio...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Crea Scheda
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/istruttore/clienti/${clienteId}/schede`)}
            disabled={loading}
          >
            <i className="fas fa-times me-2"></i>
            Annulla
          </button>
        </div>
      </form>
    </div>
  )
}
