import { FormQuestion } from './form-question';

export interface EvaluationForm {
  id: string;
  name: string;
  tema_id: string;
  perguntas: FormQuestion[];
  createdAt: string;
  updatedAt: string;
  isAnswered: boolean;
}
