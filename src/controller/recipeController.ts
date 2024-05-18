import express from "express";

export class recipeController {

    public static async recipe(req: express.Request, res: express.Response) {
        res.send(`get recipe`);
    }
    
}