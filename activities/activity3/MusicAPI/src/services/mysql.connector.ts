import { createPool, Pool, PoolConnection } from "mysql2";
let pool: Pool | null = null;

const initializeMySqlConnector = () => {
    try {

        console.log(`MY_SQL_DB_HOST:${process.env.MY_SQL_DB_HOST}`);  // 127.0.0.1
        console.log(`MY_SQL_DB_USER:${process.env.MY_SQL_DB_USER}`);  // root
        console.log(`MY_SQL_DB_PASSWORD:${process.env.MY_SQL_DB_PASSWORD}`);  // root
        console.log(`MY_SQL_DB_PORT:${process.env.MY_SQL_DB_PORT}`);  // 3306
        console.log(`MY_SQL_DB_DATABASE:${process.env.MY_SQL_DB_DATABASE}`);  // music
        console.log(`MY_SQL_DB_CONNECTION_LIMIT:${process.env.MY_SQL_DB_CONNECTION_LIMIT}`);  // 10

        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        console.debug('MySql Adapter Pool generated successfully');
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error MySql failed to connect:', err.message);
                // Don't throw here — it crashes the process from a callback
            } else {
                console.log('connection made');
                connection.release();
            }
        })
    } catch (error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
        throw new Error('failed to initialize pool');
    }
}

export const execute = <T>(query: string, params: (string | number | object)[]): Promise<T> => {    
    try {
        if (!pool) {
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results as unknown as T);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};

