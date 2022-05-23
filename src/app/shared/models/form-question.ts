import { Option } from './options';

export interface FormQuestion {
  id: string;
  pergunta: string;
  ficha_id: string;
  is_subjective: boolean;
  options?: Option[];
  createdAt: string;
  updatedAt: string;
}
