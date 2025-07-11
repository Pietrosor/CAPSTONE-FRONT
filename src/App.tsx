import { BrowserRouter, Routes, Route } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"

import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import IstruttoreClientiPage from "./pages/IstruttoreClientiPage"
import ClienteDashboard from "./pages/ClienteDashboard"
import LeMieSchedePage from "./pages/LeMieSchede"
import MainLayout from "./layouts/MainLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth roles={["ISTRUTTORE"]} />}>
            <Route
              path="/istruttore/clienti"
              element={<IstruttoreClientiPage />}
            />
            <Route path="/istruttore/schede" element={<LeMieSchedePage />} />
          </Route>

          <Route element={<RequireAuth roles={["CLIENTE"]} />}>
            <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
            <Route path="/cliente/schede" element={<LeMieSchedePage />} />
          </Route>

          <Route path="*" element={<h1>404 – Pagina non trovata</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
