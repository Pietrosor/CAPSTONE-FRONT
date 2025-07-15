// schedaService.ts
import { apiFetch } from "../api/api"
import type { SchedaDto } from "../types/scheda"

export function createScheda(
  clienteId: number,
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

export function getSchedeByClienteId(clienteId: number): Promise<SchedaDto[]> {
  return apiFetch<SchedaDto[]>(`/api/istruttore/clienti/${clienteId}/scheda`, {
    method: "GET",
  })
}
