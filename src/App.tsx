import React from "react"
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import "./App.css"

import NavbarComponent from "./components/NavbarComponent"
import FooterComponent from "./components/FooterComponents"
import RequireAuth from "./components/RequireAuth"

import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ClientiPage from "./pages/ClientiPage"

const App: React.FC = () => (
  <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<RequireAuth />}>
            <Route path="/clienti" element={<ClientiPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      <FooterComponent />
    </div>
  </BrowserRouter>
)

export default App
