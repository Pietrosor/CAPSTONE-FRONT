import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title">
                  Trasforma il tuo
                  <span className="highlight"> CORPO</span>
                  <br />
                  Trasforma la tua
                  <span className="highlight"> VITA</span>
                </h1>
                <p className="hero-subtitle">
                  Palestra professionale con istruttori qualificati, schede
                  personalizzate e tecnologia avanzata per raggiungere i tuoi
                  obiettivi fitness.
                </p>
                <div className="hero-buttons">
                  {user ? (
                    <Link
                      to={
                        user.role === "ISTRUTTORE"
                          ? "/istruttore/clienti"
                          : "/cliente/dashboard"
                      }
                      className="btn btn-primary btn-lg me-3"
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Vai alla Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="btn btn-primary btn-lg me-3"
                      >
                        <i className="fas fa-rocket me-2"></i>
                        Inizia Ora
                      </Link>
                      <Link
                        to="/login"
                        className="btn btn-outline-primary btn-lg"
                      >
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Accedi
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="image-placeholder">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Palestra moderna con attrezzi"
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                  <i className="fas fa-dumbbell fa-8x"></i>
                  <p className="mt-3">La tua palestra di fiducia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title">
                Perché scegliere
                <span className="highlight"> PALESTRA SORBO</span>
              </h2>
              <p className="section-subtitle">
                Tecnologia, professionalità e risultati garantiti
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <h4>Istruttori Qualificati</h4>
                <p>
                  Personal trainer certificati con esperienza pluriennale nel
                  settore fitness e bodybuilding.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h4>Schede Personalizzate</h4>
                <p>
                  Allenamenti su misura per te, con progressioni e monitoraggio
                  costante dei tuoi progressi.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>App Dedicata</h4>
                <p>
                  Sistema digitale avanzato per gestire i tuoi allenamenti,
                  series e ripetizioni sempre a portata di mano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Clienti Soddisfatti</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Anni di Esperienza</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Schede Create</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Supporto Online</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title">
                I nostri <span className="highlight">SERVIZI</span>
              </h2>
              <p className="section-subtitle">
                Tutto quello che ti serve per raggiungere i tuoi obiettivi
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4>Allenamento Personalizzato</h4>
                <p>
                  Schede create su misura per le tue esigenze, con progressioni
                  studiate nei minimi dettagli.
                </p>
                <ul className="service-features">
                  <li>
                    <i className="fas fa-check"></i> Valutazione iniziale
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Obiettivi personalizzati
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Monitoraggio progressi
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Tracking Digitale</h4>
                <p>
                  Sistema avanzato per monitorare ogni aspetto del tuo
                  allenamento in tempo reale.
                </p>
                <ul className="service-features">
                  <li>
                    <i className="fas fa-check"></i> App mobile dedicata
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Statistiche dettagliate
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Storico allenamenti
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Supporto Continuo</h4>
                <p>
                  I nostri istruttori ti seguono passo passo nel tuo percorso di
                  crescita e miglioramento.
                </p>
                <ul className="service-features">
                  <li>
                    <i className="fas fa-check"></i> Consulenza continua
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Correzione tecnica
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Motivazione costante
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title">
                Cosa dicono i nostri <span className="highlight">CLIENTI</span>
              </h2>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p>
                    "Grazie alle schede personalizzate e al supporto costante ho
                    raggiunto risultati che non credevo possibili!"
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="author-info">
                      <h5>Marco R.</h5>
                      <span>Cliente da 2 anni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p>
                    "L'app è fantastica, posso seguire i miei progressi e avere
                    sempre le schede aggiornate sul telefono."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="author-info">
                      <h5>Laura M.</h5>
                      <span>Cliente da 1 anno</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p>
                    "Istruttori preparatissimi e ambiente professionale.
                    Finalmente una palestra che prende sul serio i risultati!"
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="author-info">
                      <h5>Andrea T.</h5>
                      <span>Cliente da 3 anni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div className="cta-content">
                <h2 className="cta-title">
                  Pronto a iniziare il tuo{" "}
                  <span className="highlight">PERCORSO?</span>
                </h2>
                <p className="cta-subtitle">
                  Unisciti a centinaia di clienti soddisfatti e trasforma il tuo
                  corpo oggi stesso
                </p>
                {!user && (
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    <i className="fas fa-rocket me-2"></i>
                    Inizia Subito - È Gratis!
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
