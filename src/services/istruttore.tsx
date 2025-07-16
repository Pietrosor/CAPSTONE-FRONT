import { apiFetch } from "../api/api"
import type { SchedaDto } from "../types/scheda"

export function createSchedaForCliente(
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

export function getSchedeByClienteId(clienteId: string): Promise<SchedaDto[]> {
  return apiFetch<SchedaDto[]>(`/api/istruttore/clienti/${clienteId}/scheda`, {
    method: "GET",
  })
}

export function assignSchedaToCliente(
  schedaId: string,
  clienteId: string
): Promise<SchedaDto> {
  return apiFetch<SchedaDto>(
    `/api/istruttore/schede/${schedaId}/cliente/${clienteId}`,
    { method: "PUT" }
  )
}
