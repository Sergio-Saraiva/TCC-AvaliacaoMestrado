import { Observable, switchMap } from 'rxjs';
import { ServiceBase } from './service-base';

export class ServiceBaseGet<S> extends ServiceBase {
  getAll(query?: string): Observable<S[]> {
    if (!query) {
      query = '';
    }

    return this.url$.pipe(
      switchMap((url) => this.httpClient.get<S[]>(`${url}/getAll?${query}`))
    );
  }
}
