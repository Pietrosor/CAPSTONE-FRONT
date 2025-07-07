// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"

// 1) importa lo stile di Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

// 2) importa i tuoi stili globali
import "./index.css"

// 3) infine il componente App
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
