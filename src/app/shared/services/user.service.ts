import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoginData } from '../models/login-data';
import { UserInformation } from '../models/user-information';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBaseAllEndpoints<any, any> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('session', configService, httpClient);
  }

  signIn(item: LoginData): Observable<any> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.post(`${url}/login`, item))
    );
  }

  setUserInformation(data: UserInformation): void {
    localStorage.setItem('user_information', JSON.stringify(data));
  }

  getUserInformation(): UserInformation {
    return JSON.parse(localStorage.getItem('user_information'));
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    if (token) {
      const now: Date = new Date();
      const decodedToken = jwtDecode(token);
      if (now > new Date(JSON.parse(JSON.stringify(decodedToken)).iat)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_information');
  }
}
