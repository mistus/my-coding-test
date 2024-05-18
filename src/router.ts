
import express from "express";
import { recipeController } from "./controller/recipeController";

const router = express.Router();

router.get('/recipes', recipeController.getRecipeList);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes', recipeController.postRecipe);
router.patch('/recipes/:id', recipeController.patchRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);

router.get('/test',(req: express.Request, res: express.Response) => {
    res.send(`IP: ${req.ip}`);
});

export default router;