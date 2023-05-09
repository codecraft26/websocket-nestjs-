import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

type friend = {
  comment: string;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn() id;
  @Column({ type: 'varchar', unique: true }) username: string;
  @Column({ type: 'varchar' }) password: string;
  @Column({ type: 'varchar' }) full_name: string;
  @Column({ type: 'varchar' }) display_name: string;
  @Column({ type: 'varchar', nullable: true }) avatar: string;
  @Column({ type: 'timestamp', nullable: true }) last_seen_at;
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];
}