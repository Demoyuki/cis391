
//imports express libraries
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';


dotenv.config();


//Creates an express app and assigns it to app variable
const app = express();

const port = process.env.PORT;

app.use(cors());

//Parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);


if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the Music API<h1/>');
});


app.use('/', [albumsRouter, artistsRouter]);

//This method binds the app with the specified port(3000) to listen for any connections.
app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)

});