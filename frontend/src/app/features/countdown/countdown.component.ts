import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CountdownService } from 'app/shared/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() hour: number;
  @Input() minute: number;
  @Output() onCountdownStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCountdownEnd: EventEmitter<void> = new EventEmitter<void>();

  public countdown: string;
  private countdownSub: Subscription;

  constructor(private countdownService: CountdownService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }

    let hasEmittedCountdownStart = false;

    this.countdownSub = this.countdownService
      .getCountdownTo(this.hour, this.minute)
      .do(countdown => {
        if (!hasEmittedCountdownStart) {
          hasEmittedCountdownStart = true;
          this.onCountdownStart.next();
        }

        this.countdown = countdown;
      })
      .subscribe(
        () => {},
        () => {},
        () => {
          this.countdown = '';
          this.onCountdownEnd.next();
        }
      );
  }

  ngOnDestroy() {
    this.onCountdownEnd.next();
    this.countdownSub.unsubscribe();
  }
}
