

export interface EsercizioDto {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
}

export interface SchedaDto {
  id: number;
  titolo: string;
  descrizione: string;
  dataCreazione: string;     
  esercizi: EsercizioDto[];
}