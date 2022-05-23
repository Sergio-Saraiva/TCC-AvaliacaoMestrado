import { Observable, switchMap } from 'rxjs';
import { APIResponseModel } from '../interfaces/api-response-model';
import { ServiceBase } from './service-base';

export class ServiceBaseGet<S, T> extends ServiceBase {
  getAll(query?: string): Observable<APIResponseModel<T>> {
    if (!query) {
      query = '';
    }

    return this.url$.pipe(
      switchMap((url) =>
        this.httpClient.get<APIResponseModel<T>>(`${url}/?${query}`)
      )
    );
  }
}
