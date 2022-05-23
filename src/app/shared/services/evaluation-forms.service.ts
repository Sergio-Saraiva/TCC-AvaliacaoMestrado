import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { EvaluationForm } from '../models/evaluation-form';
import { FormAnswerResponse } from '../models/form-answer-response';
import { FormQuestionAnswer } from '../models/form-question-answer';
import { UserInformation } from '../models/user-information';
import { OrderBy } from '../odata-query-maker/enums/order-by';
import { ODataQueryMaker } from '../odata-query-maker/odata-query-maker';
import { AnswersService } from './answers.service';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class EvaluationFormService extends ServiceBaseAllEndpoints<
  EvaluationForm,
  EvaluationForm
> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('fichas', configService, httpClient);
  }

  getIsFormAnswered(
    form: EvaluationForm,
    user: UserInformation,
    answers: FormAnswerResponse[]
  ): boolean {
    let filteredAnswers = answers.filter((a) => a.fichas_id === form.id);
    filteredAnswers = filteredAnswers.filter((a) => {
      if (
        a.discente_id === user.id ||
        a.docente_id === user.id ||
        a.tae_id === user.id
      ) {
        return a;
      }
    });

    let counter = 0;

    filteredAnswers.map((fA) => {
      form.perguntas.map((p) => {
        if (fA.perguntas_id === p.id) {
          counter++;
        }
      });
    });

    if (counter === form.perguntas.length) {
      return true;
    }

    return false;
  }
}
