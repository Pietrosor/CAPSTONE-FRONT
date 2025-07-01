import React from "react"
import { Outlet } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import FooterComponent from "../components/FooterComponents"

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 container mt-4">
        <Outlet />
      </main>

      <FooterComponent />
    </div>
  )
}
