import {
  WebSocketGateway,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { get } from 'request';

import { NormalizedModel } from '../normalized-model.class';
import { requestOptions } from '../../../helpers/http.helper';
import { IUserWithId, IUserWithoutId } from './users.interface';

@WebSocketGateway()
export class UsersService extends NormalizedModel<IUserWithoutId>
  implements OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor() {
    super('userId');
  }

  @SubscribeMessage('CONNECT_USER')
  async connectUser(client, username: string) {
    const user = this.getUser(username);

    if (!!user) {
      this.setUserOnline(user);

      client.user = user;

      this.server.sockets.emit('CONNECT_USER_SUCCESS', user);
    } else {
      const newUser = await this.addUser(username);

      client.user = newUser;

      this.setUserOnline(newUser);
      this.server.sockets.emit('CONNECT_USER_SUCCESS', newUser);
    }
  }

  handleDisconnect(client: any) {
    if (!client.user) {
      return;
    }

    this.setUserOffline(client.user);

    if (this.getNbConnectionsUser(client.user) === 0) {
      this.server.sockets.emit('DISCONNECT_USER_SUCCESS', client.user.id);
    }
  }

  getUser(username: string): IUserWithId {
    const user = this.ids
      .map(userId => this.entities[userId])
      .find(userTmp => userTmp.username === username);

    return user ? user : null;
  }

  getNbConnectionsUser(user: IUserWithId): number {
    if (!!this.entities[user.id]) {
      return this.entities[user.id].nbConnections;
    }

    return 0;
  }

  getNbConnections(): number {
    return this.ids.length;
  }

  addUser(username: string): Promise<IUserWithId> {
    return new Promise((resolve, reject) => {
      get(
        `https://api.github.com/users/${username}`,
        requestOptions,
        (error, response, body) => {
          const user: IUserWithoutId = {
            username,
            thumbnail: '',
            nbConnections: 0,
            isOnline: false,
          };

          if (!error) {
            try {
              body = JSON.parse(body);
              user.thumbnail = body.avatar_url || '';
            } catch (err) {}
          }

          const newUser = this.create(user);

          resolve(newUser);
        }
      );
    });
  }

  setUserOnline(user: IUserWithId): void {
    const userRef = this.entities[user.id];

    if (!userRef) {
      return;
    }

    userRef.isOnline = true;
    userRef.nbConnections++;
  }

  setUserOffline(user: IUserWithId): void {
    const userRef = this.entities[user.id];

    if (!userRef) {
      return;
    }

    userRef.nbConnections--;
    userRef.isOnline = !!userRef.nbConnections;
  }
}
