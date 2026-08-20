import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('messages')
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userMessage: string;
  
    @Column('text')
    botReply: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }