import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseGet } from './service-base-get';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends ServiceBaseGet<any> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('HomeEndpoint', configService, httpClient);
  }

  // getAll() {
  //   return of(['helloWorld']);
  // }
}
