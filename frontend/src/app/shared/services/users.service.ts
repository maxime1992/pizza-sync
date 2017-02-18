import { Injectable } from '@angular/core';

import { WebsocketService } from './websocket.service';

@Injectable()
export class UsersService {
  // TODO : Search in code for 'TODO(SPLIT_SOCKET)'
  constructor(private _websocketService: WebsocketService) { }
}
