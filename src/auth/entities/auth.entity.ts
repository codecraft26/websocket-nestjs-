import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {


    @PrimaryGeneratedColumn()
    @Column()
    id: number
    @Column()
    name: string
    @Column()
    email: string



}
