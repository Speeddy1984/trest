import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({ namespace: '/support' })
  export class SupportGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('SupportGateway');
    private server!: Server;  // Используем !, чтобы указать, что значение будет инициализировано
  
    afterInit(server: Server) {
      this.server = server;
      this.logger.log('SupportGateway initialized');
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('subscribeToChat')
    handleSubscribeToChat(@MessageBody() payload: { chatId: string }, @ConnectedSocket() client: Socket): void {
      client.join(payload.chatId);
      this.logger.log(`Client ${client.id} joined chat room: ${payload.chatId}`);
    }
  
    broadcastNewMessage(chatId: string, message: any): void {
      this.server.to(chatId).emit('newMessage', message);
      this.logger.log(`Broadcasted new message to chat ${chatId}`);
    }
  }
  