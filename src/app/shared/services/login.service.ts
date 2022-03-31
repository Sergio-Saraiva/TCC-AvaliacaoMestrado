import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { LoginData } from '../models/login-data';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseAllEndpoints } from './service-base-all-endpoints';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ServiceBaseAllEndpoints<LoginData> {
  constructor(configService: ConfigurationService, httpClient: HttpClient ) {
    super('SignUp', configService, httpClient);
  }

  signIn(item: LoginData): Observable<any> {
    // return this.url$.pipe(switchMap(url => this.httpClient.post(`${url}/login`, item)))
    return of('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt', token)
  }

  isLoggedIn(): boolean {
    const token  = localStorage.getItem('jwt');
    if(token) {
      const now: Date = new Date();
      const decodedToken  = jwtDecode(token);
      if(now > new Date(JSON.parse(JSON.stringify(decodedToken)).iat)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
