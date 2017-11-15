import { Injectable } from '@angular/core';

import { WebsocketService } from 'app/shared/services/websocket.service';

@Injectable()
export class OrdersService {
  // TODO : Search in code for 'TODO(SPLIT_SOCKET)'
  constructor(private websocketService: WebsocketService) {}
}
