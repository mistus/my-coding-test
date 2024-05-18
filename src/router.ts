
import express from "express";
import { recipeController } from "./controller/recipeController";

const router = express.Router();

router.get('/recipe', recipeController.recipe);

router.get('/test',(req: express.Request, res: express.Response) => {
    res.send(`IP: ${req.ip}`);
});

export default router;