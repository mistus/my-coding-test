import express from "express";
import AppDataSource from "../db/dataSource";
import { Animal } from "../db/entity/animal";

export class animalController {

    public static async getList(req: express.Request, res: express.Response)
    {
        try {
            const repository = AppDataSource.getRepository(Animal);
            const animals = await repository.find();

            res.status(200).json({
                message: "200 OK",
                animals: animals.map(animal => ({
                    id: animal.id,
                    name: animal.name
                }))
            });
        } catch (error) {
            console.error("予想外のエラーが発生しました", error);
            res.status(500).json({
                message: "Unexpected error occurred"
            });
        }
    }

    public static async get(req: express.Request, res: express.Response)
    {
        try {
            const id =  Number(req.params.id);
            if (!id) {
                res.status(400).json({
                    message: "Bad request",
                    required: "id"
                });
                return;
            }

            const repository = AppDataSource.getRepository(Animal);
            const animal = await repository.findOneBy({
                id: id,
            });

            if(!animal) {
                res.status(404).json({
                    message: "404 nou found"
                });
                return;
            }

            res.status(200).json({
                message: "200 OK",
                animal: [
                    {
                        id: animal.id,
                        name: animal.name
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
    
    public static async post(req: express.Request, res: express.Response)
    {
        console.log(req.body);
        const name = req.body.name;
        if (!name) {
            res.status(400).json({
                message: "Bad request",
                required: "id"
            });
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
            res.status(200).json({
                message: "200 OK",
                animal: [
                    {
                        id: animal.id,
                        name: animal.name
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

    public static async patch(req: express.Request, res: express.Response)
    {
        const id =  Number(req.params.id);
        const newName = req.body.name;
        if (!id || !newName) {
            res.status(400).json({
                message: "Bad request",
                required: "id"
            });
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
                res.status(404).json({
                    message: "404 nou found"
                });
                return;
            }

            animal.changeName(newName);
            await repository.save(animal);
            await queryRunner.commitTransaction();
            res.status(200).json({
                message: "200 OK",
                animal: [
                    {
                        name: animal.name
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

    public static async delete(req: express.Request, res: express.Response)
    {
        const id =  Number(req.params.id);
        if (!id) {
            res.status(400).json({
                message: "Bad request",
                required: "id"
            });
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
                res.status(404).json({
                    message: "404 nou found"
                });
                return;
            }
 
            await repository.remove(animal);
            await queryRunner.commitTransaction();

            res.status(200).json({
                message: "200 OK",
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
}