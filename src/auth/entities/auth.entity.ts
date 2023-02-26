import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {


    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    email: string



}
