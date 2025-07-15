import { apiFetch } from "../api/api"
import type { SchedaDto } from "../types/scheda"

export function assignSchedaToCliente(
  schedaId: string,
  clienteId: string
): Promise<SchedaDto> {
  return apiFetch<SchedaDto>(
    `/api/istruttore/schede/${schedaId}/cliente/${clienteId}`,
    { method: "PUT" }
  )
}
