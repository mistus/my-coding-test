import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity("animals")
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

  public changeName(name: string) {
    this.name = name;
  }

  //factory method
  public static createAnimal(name: string): Animal{
    return new Animal(name);
  }
}