import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { delay, dematerialize, materialize } from 'rxjs/operators';

import { environment } from 'environments/environment';

/**
 * this simulates the behaviour of Angular's http module:
 * if the status code is not a 2XX, it will return a failing Observable
 */
export function response<T = undefined>(status: number): Observable<T> {
  return responseBody<T>(undefined, status);
}

/**
 * this simulates the behaviour of Angular's http module:
 * if the status code is not a 2XX, it will return a failing Observable
 */
export function responseBody<T = undefined>(
  body: T,
  status = 200,
  error?: { code: number; message: string }
): Observable<T> {
  if (status >= 200 && status < 300) {
    return of(body).pipe(delay(environment.httpDelay));
  } else {
    return _throw(new HttpErrorResponse({ status, error })).pipe(
      materialize(),
      delay(environment.httpDelay),
      dematerialize()
    );
  }
}

/**
 * the backend answers errors like this
 */
export function errorBackend<T = undefined>(
  message: string,
  code: number
): Observable<T> {
  return responseBody(undefined, code, { code, message });
}
