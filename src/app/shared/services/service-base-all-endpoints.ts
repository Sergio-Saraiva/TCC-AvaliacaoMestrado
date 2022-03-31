import { Observable, switchMap } from 'rxjs';
import { ServiceBaseGet } from './service-base-get';

export class ServiceBaseAllEndpoints<S> extends ServiceBaseGet<S> {
  getAll(query?: string): Observable<S[]> {
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
