import pg from "pg";
const {Pool} = pg;
import 'dotenv/config'
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database : process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};
const pool = new Pool(config);
export default pool;

