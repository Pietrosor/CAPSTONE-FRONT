import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

interface EsercizioDto {
  id: string
  name: string
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

interface GiornoAllenamento {
  nome: string
  esercizi: {
    nome: string
    serie: number
    ripetizioni: string
    recupero: string
    note?: string
  }[]
}

const parseSchedaDescrizione = (descrizione: string): GiornoAllenamento[] => {
  const giorni: GiornoAllenamento[] = []

  const giorniMatches = descrizione.split(/\n\n/)

  for (const blocco of giorniMatches) {
    const lines = blocco.split("\n")
    const primaLinea = lines[0]

    const giornoMatch = primaLinea.match(
      /^(Lunedì|Martedì|Mercoledì|Giovedì|Venerdì|Sabato|Domenica):/
    )

    if (giornoMatch) {
      const nomeGiorno = giornoMatch[1]
      const esercizi = []

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]

        const esercizioMatch = line.match(/^- (.+): (\d+) serie x (.+) rip/)

        if (esercizioMatch) {
          esercizi.push({
            nome: esercizioMatch[1],
            serie: parseInt(esercizioMatch[2]),
            ripetizioni: esercizioMatch[3],
            recupero: "60s",
            note: "",
          })
        }
      }

      giorni.push({
        nome: nomeGiorno,
        esercizi,
      })
    }
  }

  return giorni
}

export default function ClienteDashboard() {
  const { user } = useAuth()
  const [schede, setSchede] = useState<SchedaDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [schedaSelezionata, setSchedaSelezionata] = useState<SchedaDto | null>(
    null
  )

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
        setSchede(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null
  if (loading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <strong>Errore:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-2">
            <i className="fas fa-user-circle me-2 text-primary"></i>
            Benvenuto, {user.username}!
          </h1>
          <p className="text-muted">
            <i className="fas fa-dumbbell me-2"></i>
            Le tue schede di allenamento
          </p>
        </div>
        <div className="col-md-4 text-end">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h5 className="card-title">
                <i className="fas fa-clipboard-list me-2"></i>
                {schede.length}
              </h5>
              <p className="card-text small text-muted">Schede disponibili</p>
            </div>
          </div>
        </div>
      </div>

      {schede.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="fas fa-info-circle fa-2x mb-3"></i>
              <h4>Nessuna scheda disponibile</h4>
              <p className="mb-0">
                Rivolgiti al tuo istruttore per ricevere la tua prima scheda di
                allenamento.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {schede.map((scheda) => {
            const giorni = parseSchedaDescrizione(scheda.descrizione)
            const isMultiDay = giorni.length > 0

            return (
              <div key={scheda.id} className="col-lg-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fas fa-dumbbell me-2"></i>
                        {scheda.titolo}
                      </h5>
                      <small>
                        <i className="fas fa-calendar me-1"></i>
                        {new Date(scheda.dataCreazione).toLocaleDateString(
                          "it-IT"
                        )}
                      </small>
                    </div>
                  </div>

                  <div className="card-body">
                    {scheda.descrizione && !isMultiDay && (
                      <p className="text-muted mb-3">{scheda.descrizione}</p>
                    )}

                    {isMultiDay ? (
                      <div className="mb-3">
                        {giorni.map((giorno, index) => (
                          <div key={index} className="mb-4">
                            <h6 className="fw-bold text-primary mb-2">
                              <i className="fas fa-calendar-day me-2"></i>
                              {giorno.nome}
                            </h6>

                            {giorno.esercizi.length > 0 ? (
                              <div className="table-responsive">
                                <table className="table table-sm table-striped">
                                  <thead>
                                    <tr>
                                      <th>Esercizio</th>
                                      <th>Serie</th>
                                      <th>Ripetizioni</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {giorno.esercizi.map((esercizio, idx) => (
                                      <tr key={idx}>
                                        <td>
                                          <strong>{esercizio.nome}</strong>
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
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-muted small">
                                Nessun esercizio per questo giorno
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">
                          <i className="fas fa-list me-2"></i>
                          Esercizi ({scheda.esercizi.length})
                        </h6>

                        {scheda.esercizi.length === 0 ? (
                          <p className="text-muted">
                            Nessun esercizio assegnato
                          </p>
                        ) : (
                          <div className="row">
                            {scheda.esercizi.map((esercizio) => (
                              <div key={esercizio.id} className="col-md-6 mb-2">
                                <div className="card card-body py-2">
                                  <div className="d-flex align-items-center">
                                    <div className="me-2">
                                      <i className="fas fa-dumbbell text-primary"></i>
                                    </div>
                                    <div>
                                      <h6 className="mb-0">{esercizio.name}</h6>
                                      <small className="text-muted">
                                        {esercizio.equipment}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="row text-center mt-3">
                      <div className="col-4">
                        <div className="border-end">
                          <h6 className="text-primary mb-0">
                            {isMultiDay ? giorni.length : "1"}
                          </h6>
                          <small className="text-muted">
                            {isMultiDay ? "Giorni" : "Scheda"}
                          </small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="border-end">
                          <h6 className="text-success mb-0">
                            {isMultiDay
                              ? giorni.reduce(
                                  (acc, g) => acc + g.esercizi.length,
                                  0
                                )
                              : scheda.esercizi.length}
                          </h6>
                          <small className="text-muted">Esercizi</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <h6 className="text-warning mb-0">
                          {isMultiDay
                            ? giorni.reduce(
                                (acc, g) =>
                                  acc +
                                  g.esercizi.reduce(
                                    (sum, e) => sum + e.serie,
                                    0
                                  ),
                                0
                              )
                            : "?"}
                        </h6>
                        <small className="text-muted">Serie Tot.</small>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent">
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() => setSchedaSelezionata(scheda)}
                    >
                      <i className="fas fa-eye me-2"></i>
                      Visualizza Dettagli
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {schedaSelezionata && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-dumbbell me-2"></i>
                  {schedaSelezionata.titolo}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSchedaSelezionata(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="text-muted mb-2">
                    <i className="fas fa-calendar me-2"></i>
                    Data creazione:{" "}
                    {new Date(
                      schedaSelezionata.dataCreazione
                    ).toLocaleDateString("it-IT")}
                  </h6>
                </div>

                {parseSchedaDescrizione(schedaSelezionata.descrizione).map(
                  (giorno, index) => (
                    <div key={index} className="mb-4">
                      <h5 className="text-primary mb-3">
                        <i className="fas fa-calendar-day me-2"></i>
                        {giorno.nome}
                      </h5>

                      {giorno.esercizi.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead className="table-dark">
                              <tr>
                                <th>#</th>
                                <th>Esercizio</th>
                                <th>Serie</th>
                                <th>Ripetizioni</th>
                                <th>Recupero</th>
                              </tr>
                            </thead>
                            <tbody>
                              {giorno.esercizi.map((esercizio, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <span className="badge bg-secondary">
                                      {idx + 1}
                                    </span>
                                  </td>
                                  <td>
                                    <strong>{esercizio.nome}</strong>
                                  </td>
                                  <td>
                                    <span className="badge bg-primary fs-6">
                                      {esercizio.serie}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge bg-success fs-6">
                                      {esercizio.ripetizioni}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge bg-warning fs-6">
                                      {esercizio.recupero}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="alert alert-info">
                          Nessun esercizio per questo giorno
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSchedaSelezionata(null)}
                >
                  <i className="fas fa-times me-2"></i>
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
