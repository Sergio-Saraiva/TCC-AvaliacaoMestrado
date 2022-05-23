import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '../models/options';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class OptionsService extends ServiceBaseAllEndpoints<Option, Option> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('opcoes', configService, httpClient);
  }

  getOptionFromPeruntaId(pergunta_id: string, options: Option[]) {
    return options.filter((o) => {
      {
        if (o.pergunta_id === pergunta_id) {
          return o;
        }
      }
    });
  }
}
