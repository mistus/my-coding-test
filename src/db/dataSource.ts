import { DataSource } from "typeorm"
// import config from "./ormconfig";
import dotenv from 'dotenv';
import path from 'path';
//データソース、複数DBを管理する場合getConnectionManagerを導入する
// let AppDataSource: DataSource;

export async function initDb(){
    try{
        await AppDataSource.initialize();
        console.log('DataSource初期化されました');
    }catch(err) {
        console.error('DataSource初期化失敗しました', err);
    }
}

/** migrationは独立で実行したいので、サーバー起動以外に.envを初期化を設定する */
dotenv.config();
const AppDataSource:DataSource = new DataSource({
    type: 'mysql',
    host: "db",
    port: 3306,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [path.join(__dirname, 'entity/*')],
    migrations: [path.join(__dirname, 'migration/*')],
    synchronize: false,
});
export default AppDataSource;