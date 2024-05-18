import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import { initDb } from './db/dataSource';

async function runServer(){
    dotenv.config();

    await initDb();

    const app = express();
    const port = process.env.PORT;
    // app.set('trust proxy', 1); //nginx代理
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", router);
    app.listen(port);
    console.log(`server is running. Port: ${port}`);
}

runServer();
