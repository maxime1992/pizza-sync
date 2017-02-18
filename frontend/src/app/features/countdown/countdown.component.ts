import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CountdownService } from './../../shared/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() hour: number;
  @Input() minute: number;
  @Output() onCountdownEnd: EventEmitter<void> = new EventEmitter<void>();

  public countdown: string;
  private _countdownSub: Subscription;

  constructor(private _countdownService: CountdownService) { }

  ngOnInit() {
    this._countdownSub = this._countdownService.getCountdownTo(this.hour, this.minute).subscribe(
      (countdown) => { this.countdown = countdown },
      () => { },
      () => {
        this.countdown = '';
        this.onCountdownEnd.next()
      }
    )
  }

  ngOnDestroy() {
    this._countdownSub.unsubscribe();
  }
}
