import React from "react"

export default function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="mb-3">
              <i className="fas fa-dumbbell me-2"></i>
              Chi Siamo
            </h1>
            <p className="lead">
              La storia di Palestra Sorbo inizia nel 2013 con una missione
              semplice: trasformare le vite attraverso il fitness.
            </p>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-history me-2"></i>
                La Nostra Storia
              </h3>
              <p className="card-text">
                Fondata da Alessandro Sorbo, personal trainer con oltre 15 anni
                di esperienza, la palestra nasce dall'idea di creare uno spazio
                dove tecnologia e competenza si uniscono per offrire un servizio
                di altissima qualità.
              </p>
              <p className="card-text">
                Negli anni abbiamo aiutato centinaia di persone a raggiungere i
                propri obiettivi, dalle trasformazioni fisiche più spettacolari
                ai piccoli traguardi quotidiani che fanno la differenza.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-bullseye me-2"></i>
                La Nostra Missione
              </h3>
              <p className="card-text">
                Crediamo che ogni persona abbia il potenziale per trasformare il
                proprio corpo e la propria vita. Il nostro approccio combina:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-warning me-2"></i>
                  <strong>Personalizzazione:</strong> Ogni scheda è creata su
                  misura
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-warning me-2"></i>
                  <strong>Tecnologia:</strong> App dedicata per monitorare i
                  progressi
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-warning me-2"></i>
                  <strong>Supporto:</strong> Istruttori sempre disponibili
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-warning me-2"></i>
                  <strong>Risultati:</strong> Obiettivi concreti e misurabili
                </li>
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-map-marker-alt me-2"></i>
                Dove Siamo
              </h3>
              <p className="card-text">
                La nostra palestra si trova in{" "}
                <strong>Via dello Sport 69</strong>, in una location moderna e
                facilmente raggiungibile con ampio parcheggio.
              </p>
              <p className="card-text">
                Disponiamo di oltre 300 mq di spazio dedicato all'allenamento,
                con attrezzature all'avanguardia e un ambiente sempre pulito e
                sicuro.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">
                <i className="fas fa-users me-2"></i>
                Il Team
              </h3>
              <p className="card-text">
                Il nostro staff è composto da personal trainer certificati e
                professionisti del settore, sempre aggiornati sulle ultime
                tecniche di allenamento.
              </p>
              <p className="card-text">
                Oltre alla competenza tecnica, quello che ci distingue è la
                passione: amiamo quello che facciamo e ci impegniamo ogni giorno
                per far raggiungere i migliori risultati ai nostri clienti.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="fas fa-phone me-2"></i>
                  Contattaci
                </h4>
                <p className="card-text">
                  Vuoi saperne di più o prenotare una consulenza gratuita?
                </p>
                <p className="card-text">
                  <strong>Telefono:</strong> 081 123 4567
                  <br />
                  <strong>Email:</strong> info@palestrasorbo.it
                  <br />
                  <strong>Orari:</strong> Lun-Ven 6:00-22:00, Sab-Dom 8:00-20:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
