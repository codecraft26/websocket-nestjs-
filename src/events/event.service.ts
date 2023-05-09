import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../messages/messages.service';
import {
  MessagePayload,
  MessageSeenPayload,
} from '../messages/messages.interface';
@Injectable()
export class EventService {
  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const authToken = socket.handshake.headers.auth_token as string;
    const user = await this.authService.verifyJwtToken(authToken);
    if (!user) {
      return null;
    }
    return user;
  }

  async recordMessageInDb(message: MessagePayload) {
    await this.messageService.saveMessage(message);
  }

  async messageSeen(message: MessageSeenPayload) {
    return await this.messageService.messageSeenByUser(message);
  }
}