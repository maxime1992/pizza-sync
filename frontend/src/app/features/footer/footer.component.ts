import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { IPizzeria } from '../../shared/states/ui/ui.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() pizzeria: IPizzeria;
}
