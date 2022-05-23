import { FormQuestionAnswer } from './form-question-answer';

export interface FormAnswerSubmit {
  fichaId: string;
  docenteId: string;
  discenteId: string;
  taeId: string;
  perguntas?: FormQuestionAnswer[];
}
