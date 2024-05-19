import express from "express";
import AppDataSource from "../db/dataSource";
import { Recipes } from "../db/entity/recipe";

export class recipeController {

    public static async getRecipeList(req: express.Request, res: express.Response)
    {
        try {
            const repository = AppDataSource.getRepository(Recipes);
            const recipes = await repository.find();
            res.status(200).json({
                "recipes": recipes.map(recipe => ({
                    "id": recipe.id,
                    "title": recipe.title,
                    "making_time": recipe.makingTime,
                    "serves": recipe.serves,
                    "ingredients": recipe.ingredients,
                    "cost": `${recipe.cost}`
                }))
            });
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
            res.status(500).json({
                message: "Unexpected error occurred"
            });
        }
    }

    public static async getRecipe(req: express.Request, res: express.Response) 
    {
        try {
            const id =  Number(req.params.id);
            if (!id) {
                res.status(200).json({
                    "message": "failed!",
                    "required": "id (number)"
                });
                return;
            }

            const repository = AppDataSource.getRepository(Recipes);
            const recipe = await repository.findOneBy({
                id: id,
            });

            if(!recipe) {
                res.status(200).json({
                    "message": "failed!",
                    "required": "recipe not found"
                });
                return;
            }

            res.status(200).json({
                "message": "Recipe details by id",
                "recipe": [
                  {
                    "id": recipe.id,
                    "title": recipe.title,
                    "making_time": recipe.makingTime,
                    "serves": recipe.serves,
                    "ingredients": recipe.ingredients,
                    "cost": `${recipe.cost}`
                  }
                ]
              });


        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
            res.status(500).json({
                message: "Unexpected error occurred"
            });
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
                    "id": recipes.id,
                    "title": recipes.title,
                    "making_time": recipes.makingTime,
                    "serves": recipes.serves,
                    "ingredients": recipes.ingredients,
                    "cost": recipes.cost,
                    "created_at": recipes.cost,
                    "updated_at": recipes.updatedAt
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
    
    public static async patchRecipe(req: express.Request, res: express.Response) 
    {
        //パラメータチェック
        const id =  Number(req.params.id);
        if (!id) {
            res.status(200).json({
                "message": "failed!",
                "required": "id (number)"
            });
            return;
        }
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

        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Recipes);
            const recipe = await repository.findOneBy({
                id: id,
            });

            if(!recipe) {
                res.status(200).json({
                    "message": "failed!",
                    "required": "recipe not found"
                });
                return;
            }

            recipe.updateRecipe(title, makingTime, serves, ingredients, cost);
            await repository.save(recipe);
            await queryRunner.commitTransaction();
            res.status(200).json(  {
                "message": "Recipe successfully updated!",
                "recipe": [
                  {
                    "title": recipe.title,
                    "making_time": recipe.makingTime,
                    "serves": recipe.serves,
                    "ingredients": recipe.ingredients,
                    "cost": `${recipe.cost}`
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

    public static async deleteRecipe(req: express.Request, res: express.Response)
    {
        const id =  Number(req.params.id);
        if (!id) {
            res.status(200).json({
                "message": "failed!",
                "required": "id (number)"
            });
            return;
        }

        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Recipes);
            const recipe = await repository.findOneBy({
                id: id,
            });

            if(!recipe) {
                res.status(200).json({ "message":"No Recipe found" });
                return;
            }
 
            await repository.remove(recipe);
            await queryRunner.commitTransaction();

            res.status(200).json({  "message": "Recipe successfully removed!" });
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
}