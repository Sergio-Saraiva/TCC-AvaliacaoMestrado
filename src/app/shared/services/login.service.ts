import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoginData } from '../models/login-data';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ServiceBaseAllEndpoints<LoginData> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('SignUp', configService, httpClient);
  }

  create(item: LoginData) {
    return of('ok')
  }
}
