import express from "express";
import AppDataSource from "../db/dataSource";
import { Animal } from "../db/entity/animal";

export class recipeController {

    public static async getRecipeList(req: express.Request, res: express.Response) {
        try {
            const repository = AppDataSource.getRepository(Animal);
            const animals = await repository.find();
            console.log(animals);
            res.send(`getRecipeList`);
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
        }
    }

    public static async getRecipe(req: express.Request, res: express.Response) {
        try {
            const id =  Number(req.params.id);
            const repository = AppDataSource.getRepository(Animal);
            const animal = await repository.findOneBy({
                id: id,
            });
            console.log(animal);
            res.send(`getRecipeList`);
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
        }
    }
    
    public static async postRecipe(req: express.Request, res: express.Response) {
        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Animal);
            const animal = Animal.createAnimal("Cat");
            await repository.save(animal);

            await queryRunner.commitTransaction();
            res.send(`postRecipe`);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("予想外のエラーが発生しました", error);
        } finally {
            await queryRunner.release();
        }
    }

    public static async patchRecipe(req: express.Request, res: express.Response) {
        res.send(`patchRecipe`);
    }

    public static async deleteRecipe(req: express.Request, res: express.Response) {
        res.send(`deleteRecipe`);
    }
}