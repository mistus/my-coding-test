import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("recipes", { schema: "default" })
export class Recipes {
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

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}