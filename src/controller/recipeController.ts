import express from "express";
import AppDataSource from "../db/dataSource";
import { Animal } from "../db/entity/animal";
import { Recipes } from "../db/entity/Recipes";

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
        //パラメータチェック
        const { title, making_time:makingTime, serves, ingredients, cost} = req.body;
        if (
            typeof title !== 'string' ||
            typeof makingTime !== 'string' ||
            typeof serves !== 'string' ||
            typeof ingredients !== 'string' ||
            typeof cost !== 'number'
        ) {
            return res.status(200).json(
                {
                    "message": "Recipe creation failed!",
                    "required": "title, making_time, serves, ingredients, cost"
                }
            );
        }
        
        //レシピー追加処理
        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Recipes);
            const recipes = Recipes.createNewRecipe(title, makingTime, serves, ingredients, cost);
            await repository.save(recipes);

            await queryRunner.commitTransaction();

            res.status(200).json({
                "message": "Recipe successfully created!",
                "recipe": [
                  {
                    "id": `${recipes.id}`,
                    "title": `${recipes.title}`,
                    "making_time": `${recipes.makingTime}`,
                    "serves": `${recipes.serves}`,
                    "ingredients": `${recipes.ingredients}`,
                    "cost": `${recipes.cost}`,
                    "created_at": `${recipes.cost}`,
                    "updated_at": `${recipes.updatedAt}`
                  }
                ]
              });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("予想外のエラーが発生しました", error);
            res.status(500).json({
                message: "Unexpected error occurred"
            });
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