import { Router, Request, Response } from 'express';
import pool from '../db/pool';
import { BibleBook } from '../models/types';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>('SELECT * FROM bible_books ORDER BY book_id');
    res.json(rows as BibleBook[]);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>('SELECT * FROM bible_books WHERE book_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(rows[0] as BibleBook);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.get('/:id/chapters', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>(
      'SELECT book_id, book_name, chapter_count FROM bible_books WHERE book_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ bookId: rows[0].book_id, bookName: rows[0].book_name, chapterCount: rows[0].chapter_count });
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

export default router;
