import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import booksRouter  from './routes/books';
import versesRouter from './routes/verses';
import notesRouter  from './routes/notes';

dotenv.config();
const app  = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/books',  booksRouter);
app.use('/api/verses', versesRouter);
app.use('/api/verses/:id/notes', notesRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
export default app;
