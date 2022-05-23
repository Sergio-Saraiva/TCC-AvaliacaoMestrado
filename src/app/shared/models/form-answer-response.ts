export interface FormAnswerResponse {
  id: string;
  docente_id: string;
  discente_id: string;
  tae_id: string;
  fichas_id: string;
  perguntas_id: string;
  is_subjective: boolean;
  subjective_answer: string;
  createdAt: Date;
  updatedAt: Date;
}
