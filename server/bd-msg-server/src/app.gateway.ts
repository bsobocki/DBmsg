import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  wsClients = [];
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client: any) {
    this.wsClients = this.wsClients.filter((c) => c !== client);
  }

  @SubscribeMessage('echoMessage')
  echoMessage(client: any, data: string): WsResponse<string> {
    return { event: 'events', data: data };
  }

  @SubscribeMessage('broadcastMessage')
  broadcastMessage(client: any, data: string): void {
    this.broadcast('receiveBroadcastedMessage', data);
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify({ event, data: message });
    for (let c of this.wsClients) {
      c.send(broadCastMessage);
    }
  }
}
