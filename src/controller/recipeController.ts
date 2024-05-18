import express from "express";

export class recipeController {

    public static async getRecipeList(req: express.Request, res: express.Response) {
        res.send(`getRecipeList`);
    }

    public static async getRecipe(req: express.Request, res: express.Response) {
        //TODO const userId = req.body.id;
        res.send(`getRecipe ${req.params.id}`);
    }

    public static async postRecipe(req: express.Request, res: express.Response) {
        res.send(`postRecipe`);
    }

    public static async patchRecipe(req: express.Request, res: express.Response) {
        res.send(`patchRecipe`);
    }

    public static async deleteRecipe(req: express.Request, res: express.Response) {
        res.send(`deleteRecipe`);
    }
}