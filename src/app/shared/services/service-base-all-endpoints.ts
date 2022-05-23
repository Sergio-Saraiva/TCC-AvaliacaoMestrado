import { Observable, switchMap } from 'rxjs';
import { APIResponseModel } from '../interfaces/api-response-model';
import { ServiceBaseGet } from './service-base-get';

export class ServiceBaseAllEndpoints<S, T> extends ServiceBaseGet<S, T> {
  getAll(query?: string): Observable<APIResponseModel<T>> {
    return super.getAll(query);
  }

  update(item: S): Observable<any> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.patch(`${url}/update`, item))
    );
  }

  create(item: S): Observable<any> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.post(`${url}/create`, item))
    );
  }
}
