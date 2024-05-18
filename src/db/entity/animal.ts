import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
