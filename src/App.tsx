import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"

import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ClientiPage from "./pages/ClientiPage"
import LeMieSchedePage from "./pages/LeMieSchede"
import ClienteDashboard from "./pages/ClienteDashboard"
import MainLayout from "./layouts/MainLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* tutte queste rotte usano il layout */}
        <Route element={<MainLayout />}>
          {/* pagine pubbliche */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* rotte protette */}
          <Route element={<RequireAuth />}>
            {/* istruttore */}
            <Route path="/istruttore/clienti" element={<ClientiPage />} />
            {/* cliente */}
            <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
            <Route path="/cliente/schede" element={<LeMieSchedePage />} />
          </Route>

          {/* fallback 404 */}
          <Route path="*" element={<h1>404 – Pagina non trovata</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
