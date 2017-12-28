import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as countdown from 'countdown';

import { getFormatedTime } from 'app/shared/helpers/time.helper';

@Injectable()
export class CountdownService {
  constructor() {}

  getCountdownTo(hour: number, minute: number): Observable<string> {
    const now = new Date();
    let previousSecond;

    return Observable.create((observer: Observer<string>) => {
      const timerId = countdown(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute,
          0
        ),
        (ts: { hours: number; minutes: number; seconds: number }) => {
          const time = getFormatedTime(ts);

          // tell listeners that a new value is available
          if (previousSecond && previousSecond > ts.seconds) {
            observer.next(time);
          }

          // stop the countdown if 0:0 or if already finished
          if (
            (ts.hours === 0 && ts.minutes === 0 && ts.seconds === 0) ||
            (previousSecond && previousSecond < ts.seconds)
          ) {
            window.clearInterval(timerId);
            observer.complete();
          }

          previousSecond = ts.seconds;
        },
        // tslint:disable-next-line:no-bitwise
        countdown.HOURS | countdown.MINUTES | countdown.SECONDS
      );

      // this will be called if unsubscribe's called
      return () => {
        // if nobody's listening, clean the countdown
        window.clearInterval(timerId);
      };
    });
  }
}
