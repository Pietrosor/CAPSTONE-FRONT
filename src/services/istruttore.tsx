// src/services/istruttore.ts
import type { SchedaDto } from "../types/scheda"
import { apiFetch } from "../api/api"

export function searchExercises(
  q: string
): Promise<{ id: string; nome: string }[]> {
  return apiFetch(`/istruttore/esercizi/search?q=${encodeURIComponent(q)}`)
}

export function createScheda(
  clienteId: string,
  dto: {
    titolo: string
    descrizione: string
    eserciziIds: string[]
  }
): Promise<SchedaDto> {
  return apiFetch<SchedaDto>(`/api/istruttore/clienti/${clienteId}/scheda`, {
    method: "POST",
    body: JSON.stringify(dto),
  })
}
