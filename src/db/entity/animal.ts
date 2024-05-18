import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity()
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  protected constructor(name: string) {
    super();
    this.name = name;
  }

  public getName(): string{
    return this.name;
  }

  //factory method
  public static createAnimal(name: string): Animal{
    return new Animal(name);
  }
}