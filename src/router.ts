
import express from "express";
import { recipeController } from "./controller/recipeController";
import { animalController } from "./controller/animalController";

const router = express.Router();

router.get('/recipes', recipeController.getRecipeList);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes', recipeController.postRecipe);
router.patch('/recipes/:id', recipeController.patchRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);

router.get('/animals', animalController.getList);
router.get('/animals/:id', animalController.get);
router.post('/animals', animalController.post);
router.patch('/animals/:id', animalController.patch);
router.delete('/animals/:id', animalController.delete)

router.get('/test',(req: express.Request, res: express.Response) => {
    res.send(`IP: ${req.ip}`);
});

export default router;