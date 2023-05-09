import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { EventService } from './event.service';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [AuthModule, MessagesModule],
  providers: [EventsGateway, EventService],
})
export class EventsModule {}