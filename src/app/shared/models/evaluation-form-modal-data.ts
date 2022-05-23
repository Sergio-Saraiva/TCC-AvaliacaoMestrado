import { FormQuestion } from './form-question';

export interface EvaluationFormModalData {
  formId: string;
  formTitle: string;
  formQuestions: FormQuestion[];
}
