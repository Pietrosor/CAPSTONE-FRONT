import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SchedaDto } from "../types/scheda"

interface SchedaDettagliModalProps {
  scheda: SchedaDto | null
  isOpen: boolean
  onClose: () => void
}

function SchedaDettagliModal({
  scheda,
  isOpen,
  onClose,
}: SchedaDettagliModalProps) {
  if (!isOpen || !scheda) return null

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-dumbbell me-2"></i>
              {scheda.titolo}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <i className="fas fa-calendar me-2"></i>
                Data creazione:{" "}
                {new Date(scheda.dataCreazione).toLocaleDateString("it-IT")}
              </h6>

              {scheda.descrizione && (
                <div className="mb-3">
                  <h6 className="fw-bold">Descrizione:</h6>
                  <p className="text-muted">{scheda.descrizione}</p>
                </div>
              )}
            </div>

            <div className="mb-3">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-list me-2"></i>
                Esercizi ({scheda.esercizi.length})
              </h6>

              {scheda.esercizi.length === 0 ? (
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  Nessun esercizio in questa scheda
                </div>
              ) : (
                <div className="row">
                  {scheda.esercizi.map((esercizio, index) => (
                    <div key={esercizio.id} className="col-md-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-start">
                            <div className="me-3">
                              <span className="badge bg-primary rounded-pill">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="card-title mb-2">
                                {esercizio.name}
                              </h6>
                              <div className="small text-muted">
                                <div className="mb-1">
                                  <i className="fas fa-crosshairs me-1"></i>
                                  <strong>Gruppo:</strong> {esercizio.bodyPart}
                                </div>
                                <div>
                                  <i className="fas fa-tools me-1"></i>
                                  <strong>Attrezzo:</strong>{" "}
                                  {esercizio.equipment}
                                </div>
                              </div>
                            </div>
                          </div>

                          {esercizio.gifUrl &&
                            esercizio.gifUrl !==
                              "https://via.placeholder.com/300x200?text=Exercise+Not+Found" && (
                              <div className="mt-3">
                                <img
                                  src={esercizio.gifUrl}
                                  alt={esercizio.name}
                                  className="img-fluid rounded"
                                  style={{
                                    maxHeight: "150px",
                                    width: "100%",
                                    objectFit: "contain",
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none"
                                  }}
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <i className="fas fa-times me-2"></i>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SchedeClientePage() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const [schede, setSchede] = useState<SchedaDto[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedScheda, setSelectedScheda] = useState<SchedaDto | null>(null)
  const [showModal, setShowModal] = useState(false)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token || !clienteId) return

    fetch(`/api/istruttore/clienti/${clienteId}/schede`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Errore ${res.status}`)
        return res.json()
      })
      .then((data: SchedaDto[]) => {
        setSchede(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [token, clienteId])

  const handleSchedaClick = (scheda: SchedaDto) => {
    setSelectedScheda(scheda)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedScheda(null)
  }

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-clipboard-list me-2"></i>
          Schede Cliente #{clienteId}
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Indietro
        </button>
      </div>

      {schede.length === 0 ? (
        <div className="alert alert-info">
          <i className="fas fa-info-circle me-2"></i>
          Nessuna scheda trovata per questo cliente.
        </div>
      ) : (
        <div className="row">
          {schede.map((scheda) => (
            <div key={scheda.id} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => handleSchedaClick(scheda)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-truncate">
                      <i className="fas fa-dumbbell me-2 text-primary"></i>
                      {scheda.titolo}
                    </h5>
                    <span className="badge bg-primary rounded-pill">
                      {scheda.esercizi.length}
                    </span>
                  </div>

                  <p className="text-muted small mb-2">
                    <i className="fas fa-calendar me-1"></i>
                    {new Date(scheda.dataCreazione).toLocaleDateString("it-IT")}
                  </p>

                  {scheda.descrizione && (
                    <p className="card-text text-truncate text-muted small">
                      {scheda.descrizione}
                    </p>
                  )}

                  <div className="mt-3">
                    <small className="text-muted">
                      <i className="fas fa-list me-1"></i>
                      {scheda.esercizi.length} esercizi
                    </small>
                  </div>
                </div>

                <div className="card-footer bg-transparent">
                  <small className="text-primary">
                    <i className="fas fa-eye me-1"></i>
                    Clicca per visualizzare dettagli
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SchedaDettagliModal
        scheda={selectedScheda}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}
