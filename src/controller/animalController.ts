import express from "express";
import AppDataSource from "../db/dataSource";
import { Animal } from "../db/entity/animal";

export class animalController {

    public static async getList(req: express.Request, res: express.Response)
    {
        try {
            const repository = AppDataSource.getRepository(Animal);
            const animals = await repository.find();
            console.log(animals);
            res.send(`getRecipeList`);
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
            res.status(500).send('予想外のエラーが発生しました');
        }
    }

    public static async get(req: express.Request, res: express.Response)
    {
        try {
            const id =  Number(req.params.id);
            if (!id) {
                res.status(400).send('Bad request');
                return;
            }

            const repository = AppDataSource.getRepository(Animal);
            const animal = await repository.findOneBy({
                id: id,
            });
            console.log(animal);
            res.send(`getRecipeList`);
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
            res.status(500).send('予想外のエラーが発生しました');
        }
    }
    
    public static async post(req: express.Request, res: express.Response)
    {
        const name = req.body.name;
        if (!name) {
            res.status(400).send('Bad request');
            return;
        }

        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Animal);
            const animal = Animal.createAnimal(name);
            await repository.save(animal);

            await queryRunner.commitTransaction();
            res.send(`postRecipe`);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("予想外のエラーが発生しました", error);
            res.status(500).send('予想外のエラーが発生しました');
        } finally {
            await queryRunner.release();
        }
    }

    public static async patch(req: express.Request, res: express.Response)
    {
        const id =  Number(req.body.id);
        const newName = req.body.name;
        if (!id || !newName) {
            res.status(400).send('Bad request');
            return;
        }

        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Animal);
            const animal = await repository.findOneBy({
                id: id,
            });

            if(!animal) {
                res.status(404).send(`指定する対象はありません`);
                return;
            }

            animal.changeName(newName);
            await repository.save(animal);
            await queryRunner.commitTransaction();
            res.status(200).send(`200 OK`);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("予想外のエラーが発生しました", error);
            res.status(500).send('予想外のエラーが発生しました');
        } finally {
            await queryRunner.release();
        }
    }

    public static async delete(req: express.Request, res: express.Response)
    {
        const id =  Number(req.body.id);
        if (!id) {
            res.status(400).send('Bad request');
            return;
        }

        const queryRunner = AppDataSource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const repository = queryRunner.manager.getRepository(Animal);
            const animal = await repository.findOneBy({
                id: id,
            });

            if(!animal) {
                res.status(404).send(`指定する対象はありません`);
                return;
            }
 
            await repository.remove(animal);
            await queryRunner.commitTransaction();

            res.status(200).send(`200 OK`);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("予想外のエラーが発生しました", error);
            res.status(500).send('予想外のエラーが発生しました');
        } finally {
            await queryRunner.release();
        }
    }
}