import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { EventService } from './event.service';
  import { DirectMessage, MessageSeen } from './interface/event.interface';
  
  @WebSocketGateway({
    namespace: 'messages',
    cors: { origin: '*' },
  })
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;
    private personSocket = {};
  
    constructor(private eventService: EventService) {}
  
    async handleConnection(socket: Socket, ...args: any[]) {
      const user = await this.eventService.getUserFromSocket(socket);
      if (!user) {
        socket.disconnect(true);
      }
      this.personSocket[user.id] = socket;
      this.personSocket[socket.id] = user.id;
    }
  
    async handleDisconnect(socket: Socket) {
      const user = await this.eventService.getUserFromSocket(socket);
      delete this.personSocket[user.id];
      delete this.personSocket[socket.id];
    }
  
    @SubscribeMessage('onDirectMessage')
    async sendDirectMessage(
      @ConnectedSocket() socket: Socket,
      @MessageBody() data: DirectMessage,
    ) {
      const { recipient_id, text } = data;
      const recipientSocket = this.personSocket[recipient_id];
      if (recipientSocket) {
        const MessagePayload = {
          sender: this.personSocket[socket.id],
          receiver: recipient_id,
          message: text,
        };
        await this.eventService.recordMessageInDb(MessagePayload);
        recipientSocket.emit('onDirectMessage', {
          sender_id: MessagePayload.sender,
          message: text,
        });
      }
    }
  
    @SubscribeMessage('onMessageSeen')
    async messageSent(
      @ConnectedSocket() socket: Socket,
      @MessageBody() data: MessageSeen,
    ) {
      const { message_id } = data;
      const userId = this.personSocket[socket.id];
      const isMessageSeen: boolean = await this.eventService.messageSeen({
        messageId: message_id,
        userId: userId,
      });
      if (isMessageSeen) {
        socket.emit('onMessageSeen', {
          seen: true,
        });
      } else {
        socket.emit('onMessageSeen', {
          seen: false,
        });
      }
    }
  }