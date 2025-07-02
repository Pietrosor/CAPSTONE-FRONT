import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

export default function ClienteDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 container py-5">
        <h1 className="mb-4">Benvenuto, Cliente!</h1>
        <p>Qui trovi la tua scheda di allenamento e i tuoi progressi.</p>
        <div className="alert alert-info mt-4">
          Scheda allenamento in arrivo…
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}
