import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../shared/models/conversations.entity';
import { In, Repository } from 'typeorm';
import { MessagePayload, MessageSeenPayload, PersonId, UserId } from './messages.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private userService: UsersService,
  ) {}

  async saveMessage(message: MessagePayload) {
    // @ts-ignore
    const userMessage = this.conversationRepository.create(message);
    await this.conversationRepository.save(userMessage);
  }

  async getAllMessages() {
    return await this.conversationRepository.find({
      relations: ['sender', 'receiver'],
    });
  }

  async messageSeenByUser(messageDetails: MessageSeenPayload) {
    const message = await this.conversationRepository.findOne({
      where: {
        id: messageDetails.messageId,
        // @ts-ignore
        'receiver.id': messageDetails.userId,
      },
    });
    if (message) {
      message.has_seen = true;
      await this.conversationRepository.save(message);
      return true;
    }
    return false;
  }

  async getConversation(userId: UserId, partnerId: PersonId) {
    return this.conversationRepository.find({
      where: [
        // @ts-ignore
        { 'sender.id': userId.id, 'receiver.id': partnerId.user },
        // @ts-ignore
        { 'sender.id': partnerId.user, 'receiver.id': userId.id },
      ],
      order: { timestamp: 'DESC' },
    });
  }
}