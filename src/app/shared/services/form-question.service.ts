import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormQuestion } from '../models/form-question';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class FormQuestionService extends ServiceBaseAllEndpoints<
  FormQuestion,
  FormQuestion
> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('perguntas', configService, httpClient);
  }

  groupQuestionByFormId(
    formId: string,
    questionFomrsArray: FormQuestion[]
  ): FormQuestion[] {
    return questionFomrsArray.filter((qf) => {
      {
        if (qf.ficha_id === formId) {
          return qf;
        }
      }
    });
  }
}
