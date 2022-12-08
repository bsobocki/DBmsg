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
    console.log('Client connected: ' + client);
    this.wsClients.push(client);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client);
    this.wsClients = this.wsClients.filter((c) => c !== client);
  }

  @SubscribeMessage('')
  randomMessage(client: any, data: string): WsResponse<string> {
    console.log('random: ' + data);
    return { event: 'events', data: data };
  }

  @SubscribeMessage('echoMessage')
  echoMessage(client: any, data: string): WsResponse<string> {
    console.log('Echo message: ' + data);
    return { event: 'events', data: data };
  }

  @SubscribeMessage('broadcastMessage')
  broadcastMessage(client: any, data: string): void {
    console.log('Broadcast message: ' + data);
    this.broadcast('receiveBroadcastedMessage', data);
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify({ event, data: message });
    for (let c of this.wsClients) {
      c.send(broadCastMessage);
    }
  }
}
