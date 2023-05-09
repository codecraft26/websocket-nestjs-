import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IdDto } from '../shared/dto/shared.dto';
import { PersonDto } from './mesaages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  async getMessages() {
    return await this.messageService.getAllMessages();
  }

  @Get(':id')
  async getConversationBetweenUsers(
    @Param() userId: IdDto,
    @Query() query: PersonDto,
  ) {
    return await this.messageService.getConversation(userId, query);
  }
}