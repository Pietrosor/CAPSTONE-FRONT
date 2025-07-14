import { apiFetch } from "../api/api"

// Search esercizi
export function searchExercises(
  q: string
): Promise<{ id: string; nome: string }[]> {
  return apiFetch(`/istruttore/esercizi/search?q=${encodeURIComponent(q)}`)
}

// Crea scheda per un cliente
export function createScheda(
  clienteId: string,
  body: {
    titolo: string
    descrizione: string
    eserciziIds: string[]
  }
): Promise<void> {
  return apiFetch<void>(`/istruttore/clienti/${clienteId}/scheda`, {
    method: "POST",
    body: JSON.stringify(body),
  })
}
