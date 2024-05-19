import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("recipes", { schema: "default" })
export class Recipes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "title", length: 100 })
  title!: string;

  @Column("varchar", { name: "making_time", length: 100 })
  makingTime!: string;

  @Column("varchar", { name: "serves", length: 100 })
  serves!: string;

  @Column("varchar", { name: "ingredients", length: 300 })
  ingredients!: string;

  @Column("int", { name: "cost" })
  cost!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  protected constructor(title: string, makingTime: string, serves: string, ingredients:string, cost:number) {
    super();
    this.title = title;
    this.makingTime = makingTime;
    this.serves = serves;
    this.ingredients = ingredients;
    this.cost = cost;
  }

  public static createNewRecipe(title: string, makingTime: string, serves: string, ingredients:string, cost:number): Recipes{
    return new Recipes(
      title,
      makingTime,
      serves,
      ingredients,
      cost
    );
  }

  public updateRecipe(title: string, makingTime: string, serves: string, ingredients:string, cost:number){
    this.title = title;
    this.makingTime = makingTime;
    this.serves = serves;
    this.ingredients = ingredients;
    this.cost = cost;
  }
}