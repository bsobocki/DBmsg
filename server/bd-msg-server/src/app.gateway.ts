import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('echoMessage')
  echoMessage(client: Socket, message: string): WsResponse<string> {
    return { event: 'echoMessage', data: `ECHO: ${message}` };
  }

  @SubscribeMessage('broadcastMessage')
  handleMessage(client: Socket, message: string): void {
    this.wss.emit('receiveBroadcastedMessage', message);
  }
}
