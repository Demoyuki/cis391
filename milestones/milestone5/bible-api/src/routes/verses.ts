import { Router, Request, Response } from 'express';
import pool from '../db/pool';
import { BibleVerse } from '../models/types';
const router = Router();

// GET /api/verses  (search + reference browse)
router.get('/', async (req: Request, res: Response) => {
  const { q, testament, book, chapter } = req.query as Record<string, string | undefined>;
  try {
    let sql = `SELECT v.*, b.book_name, b.testament
               FROM bible_verses v JOIN bible_books b ON v.book_id = b.book_id WHERE 1=1`;
    const params: unknown[] = [];
    if (q) { sql += ' AND LOWER(v.text) LIKE ?'; params.push(`%${q.toLowerCase()}%`); }
    if (testament && testament !== 'ALL') { sql += ' AND b.testament = ?'; params.push(testament.toUpperCase()); }
    if (book)    { sql += ' AND v.book_id = ?'; params.push(book); }
    if (chapter) { sql += ' AND v.chapter = ?'; params.push(chapter); }
    sql += ' ORDER BY b.book_id, v.chapter, v.verse_num';
    const [rows] = await pool.query<any[]>(sql, params);
    res.json(rows as BibleVerse[]);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

// GET /api/verses/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>(
      `SELECT v.*, b.book_name, b.testament FROM bible_verses v
       JOIN bible_books b ON v.book_id = b.book_id WHERE v.id = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Verse not found' });
    res.json(rows[0] as BibleVerse);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

// POST /api/verses
router.post('/', async (req: Request, res: Response) => {
  const { book_id, chapter, verse_num, text } = req.body;
  if (!book_id || !chapter || !verse_num || !text)
    return res.status(400).json({ error: 'book_id, chapter, verse_num, and text are required' });
  try {
    const [result] = await pool.query<any>(
      'INSERT INTO bible_verses (book_id, chapter, verse_num, text) VALUES (?, ?, ?, ?)',
      [book_id, chapter, verse_num, text]);
    const [rows] = await pool.query<any[]>(
      `SELECT v.*, b.book_name, b.testament FROM bible_verses v
       JOIN bible_books b ON v.book_id = b.book_id WHERE v.id = ?`, [result.insertId]);
    res.status(201).json(rows[0] as BibleVerse);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

// PUT /api/verses/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { book_id, chapter, verse_num, text } = req.body;
  if (!book_id && !chapter && !verse_num && !text)
    return res.status(400).json({ error: 'At least one field must be provided' });
  try {
    const fields: string[] = []; const params: unknown[] = [];
    if (book_id)   { fields.push('book_id = ?');   params.push(book_id); }
    if (chapter)   { fields.push('chapter = ?');   params.push(chapter); }
    if (verse_num) { fields.push('verse_num = ?'); params.push(verse_num); }
    if (text)      { fields.push('text = ?');      params.push(text); }
    params.push(req.params.id);
    const [result] = await pool.query<any>(`UPDATE bible_verses SET ${fields.join(', ')} WHERE id = ?`, params);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Verse not found' });
    const [rows] = await pool.query<any[]>(
      `SELECT v.*, b.book_name, b.testament FROM bible_verses v
       JOIN bible_books b ON v.book_id = b.book_id WHERE v.id = ?`, [req.params.id]);
    res.json(rows[0] as BibleVerse);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

// DELETE /api/verses/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<any>('DELETE FROM bible_verses WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Verse not found' });
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

export default router;
