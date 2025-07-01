import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout"

import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h2>404 – Pagina non trovata</h2>} />
        </Route>
      </Routes>
    </Router>
  )
}
