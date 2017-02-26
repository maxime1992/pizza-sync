import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CountdownService } from './../../shared/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() hour: number;
  @Input() minute: number;
  @Output() onCountdownStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCountdownEnd: EventEmitter<void> = new EventEmitter<void>();

  public countdown: string;
  private _countdownSub: Subscription;

  constructor(private _countdownService: CountdownService) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this._countdownSub) {
      this._countdownSub.unsubscribe();
    }

    let hasEmittedCountdownStart = false;

    this._countdownSub = this._countdownService.getCountdownTo(this.hour, this.minute).subscribe(
      (countdown) => {
        if (!hasEmittedCountdownStart) {
          hasEmittedCountdownStart = true;
          this.onCountdownStart.next();
        }

        this.countdown = countdown;
      },
      () => { },
      () => {
        this.countdown = '';
        this.onCountdownEnd.next();
      }
    );
  }

  ngOnDestroy() {
    this.onCountdownEnd.next();
    this._countdownSub.unsubscribe();
  }
}
