
import dotenv from 'dotenv';
import AppDataSource, { initDb } from '../db/dataSource';
import { Animal } from '../db/entity/animal';

/** 
 * docker内で実行するのを忘れずに
 * npx ts-node src/test/freeTest.ts
 **/
test();
async function test(){
    dotenv.config();
    await initDb();

    // await postAnimal();
    // await getAnimals();
    await getAnimal();

    process.exit(1);
}


async function getAnimal(){
    const repository = AppDataSource.getRepository(Animal);
    const animals = await repository.findOneBy({
        id:1
    });
    console.log(animals);
}


async function getAnimals(){
    const repository = AppDataSource.getRepository(Animal);
    const animals = await repository.find();
    console.log(animals);
}


async function postAnimal(){
    const queryRunner = AppDataSource.createQueryRunner();
    try{
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const repository = queryRunner.manager.getRepository(Animal);
        const animal = Animal.createAnimal("Cat");
        await repository.save(animal);
        await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("予想外のエラーが発生しました", error);
    } finally {
        await queryRunner.release();
    }
}