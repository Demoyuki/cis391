import { Router, Request, Response } from 'express';
import pool from '../db/pool';
import { VerseNote } from '../models/types';
const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>(
      'SELECT * FROM verse_notes WHERE verse_id = ? ORDER BY created_at ASC', [req.params.id]);
    res.json(rows as VerseNote[]);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.get('/:nid', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<any[]>(
      'SELECT * FROM verse_notes WHERE note_id = ? AND verse_id = ?', [req.params.nid, req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Note not found' });
    res.json(rows[0] as VerseNote);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.post('/', async (req: Request, res: Response) => {
  const { note_text } = req.body;
  if (!note_text?.trim()) return res.status(400).json({ error: 'note_text is required' });
  try {
    const [check] = await pool.query<any[]>('SELECT id FROM bible_verses WHERE id = ?', [req.params.id]);
    if (check.length === 0) return res.status(404).json({ error: 'Verse not found' });
    const [result] = await pool.query<any>(
      'INSERT INTO verse_notes (verse_id, note_text) VALUES (?, ?)', [req.params.id, note_text.trim()]);
    const [rows] = await pool.query<any[]>('SELECT * FROM verse_notes WHERE note_id = ?', [result.insertId]);
    res.status(201).json(rows[0] as VerseNote);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.put('/:nid', async (req: Request, res: Response) => {
  const { note_text } = req.body;
  if (!note_text?.trim()) return res.status(400).json({ error: 'note_text is required' });
  try {
    const [result] = await pool.query<any>(
      'UPDATE verse_notes SET note_text = ? WHERE note_id = ? AND verse_id = ?',
      [note_text.trim(), req.params.nid, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
    const [rows] = await pool.query<any[]>('SELECT * FROM verse_notes WHERE note_id = ?', [req.params.nid]);
    res.json(rows[0] as VerseNote);
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

router.delete('/:nid', async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<any>(
      'DELETE FROM verse_notes WHERE note_id = ? AND verse_id = ?', [req.params.nid, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: 'Database error', detail: String(err) }); }
});

export default router;
