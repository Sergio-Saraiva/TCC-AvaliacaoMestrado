import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormAnswerResponse } from '../models/form-answer-response';
import { FormAnswerSubmit } from '../models/form-answer-submit';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AnswersService extends ServiceBaseAllEndpoints<
  FormAnswerSubmit,
  FormAnswerResponse
> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('respostas', configService, httpClient);
  }
}
