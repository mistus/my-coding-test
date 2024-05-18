import express from 'express';
import router from './router';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.set('trust proxy', 1); //nginx代理
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.listen(port);

console.log(`server is running. Port: ${port}`);
