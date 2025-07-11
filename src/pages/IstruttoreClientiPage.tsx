import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ClienteDto {
  id: number
  username: string
  nome: string
}

export default function IstruttoreClientiPage() {
  const [clienti, setClienti] = useState<ClienteDto[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) return

    fetch("http://localhost:8080/api/istruttore/clienti", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento clienti")
        return res.json()
      })
      .then((data: any[]) => {
        console.log("Fetched clients:", data)

        setClienti(data)
      })
      .catch((err) => setError(err.message))
  }, [token])

  return (
    <>
      <div className="container py-4">
        <h2 className="mb-4">I tuoi clienti</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="striped border hover responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>

              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {clienti.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.username}</td>

                <td>
                  <button
                    className="primary sm"
                    onClick={() =>
                      navigate(`/istruttore/clienti/${cliente.id}/schede`)
                    }
                  >
                    Visualizza Schede
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
