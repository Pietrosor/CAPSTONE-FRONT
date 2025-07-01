import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./pages/Home"
import About from "./pages/About"

export default function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h2>404 – Pagina non trovata</h2>} />
        </Routes>
      </div>
    </Router>
  )
}
