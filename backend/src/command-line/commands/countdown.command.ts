import { Command } from '../command.class';
import { OrdersService } from '../../features/models/orders/orders.component';

export class CountdownCommand extends Command {
  titleWithParams = 'countdown';
  description = 'Set or change the hour when to block the orders';
  options = [
    {
      title: '--hour <hour>',
      description: 'Set or change the hour when to block the orders',
    },
    {
      title: '--minute <minute>',
      description: 'Set or change the minute when to block the orders',
    },
  ];

  constructor(private vorpal: any, private ordersService: OrdersService) {
    super(vorpal);
  }

  action(
    args: { options: { [key: string]: string } },
    callback: () => void,
    vorpalContext: { log: (msg: string) => void }
  ) {
    if (
      typeof args.options.hour === 'undefined' ||
      typeof args.options.minute === 'undefined'
    ) {
      console.log('You need to define --hour and --minute');
      return callback();
    }

    if (
      typeof args.options.hour !== 'number' ||
      typeof args.options.minute !== 'number'
    ) {
      console.log('"hour" and "minute" should be integers');
      return callback();
    }

    const hourEnd = +args.options.hour;
    const minuteEnd = +args.options.minute;

    if (hourEnd < 0 || hourEnd > 23) {
      console.log('"hour" must be between 0 and 23');
      return callback();
    }

    if (minuteEnd < 0 || minuteEnd > 59) {
      console.log('"minute" must be between 0 and 59');
      return callback();
    }

    this.ordersService.setHourAndMinuteEnd(hourEnd, minuteEnd);
    callback();
  }
}
