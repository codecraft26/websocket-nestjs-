import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => User, (user) => user.id) sender: User;
  @ManyToOne(() => User, (user) => user.id) receiver: User;
  @Column({ default: false }) has_seen: boolean;
  @Column() message: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  timestamp: Date;
}
