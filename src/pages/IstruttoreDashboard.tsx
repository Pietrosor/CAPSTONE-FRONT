import React from "react"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

export default function IstruttoreDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 container py-5">
        <h1 className="mb-4">Benvenuto, Istruttore!</h1>
        <p>
          Qui puoi creare esercizi, gestire i tuoi allievi e assegnare schede.
        </p>
        <div className="alert alert-warning mt-4">
          Dashboard istruttore in allestimento…
        </div>
      </main>

      <FooterComponent />
    </div>
  )
}
