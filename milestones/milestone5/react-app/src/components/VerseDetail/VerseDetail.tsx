import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BibleVerse, VerseNote } from '../../models/types';
import { getVerseById, deleteVerse, getNotes, createNote, updateNote, deleteNote } from '../../services/verseService';

export default function VerseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [verse, setVerse]         = useState<BibleVerse | null>(null);
  const [notes, setNotes]         = useState<VerseNote[]>([]);
  const [loading, setLoading]     = useState(true);
  const [newNote, setNewNote]     = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText]   = useState('');

  useEffect(() => {
    const n = Number(id);
    Promise.all([getVerseById(n), getNotes(n)]).then(([v, ns]) => {
      setVerse(v); setNotes(ns); setLoading(false);
    });
  }, [id]);

  const handleDeleteVerse = async () => {
    if (!verse || !confirm('Delete this verse and all its notes?')) return;
    await deleteVerse(verse.id);
    navigate('/verses');
  };

  const handleAddNote = async () => {
    if (!verse || !newNote.trim()) return;
    const n = await createNote(verse.id, newNote.trim());
    setNotes(prev => [...prev, n]); setNewNote('');
  };

  const handleSaveEdit = async (note: VerseNote) => {
    if (!verse) return;
    const updated = await updateNote(verse.id, note.note_id, editText);
    setNotes(prev => prev.map(n => n.note_id === note.note_id ? updated : n));
    setEditingId(null);
  };

  const handleDeleteNote = async (note: VerseNote) => {
    if (!verse || !confirm('Delete this note?')) return;
    await deleteNote(verse.id, note.note_id);
    setNotes(prev => prev.filter(n => n.note_id !== note.note_id));
  };

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-primary" /></div>;
  if (!verse)  return <div className="container py-4"><div className="alert alert-danger">Verse not found.</div></div>;

  return (
    <div className="container py-4">
      <Link to="/verses" className="btn btn-outline-secondary btn-sm mb-4">← Back to Verses</Link>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold">✝ {verse.book_name} {verse.chapter}:{verse.verse_num}</h4>
          <div className="d-flex gap-2">
            <Link to={`/verses/${verse.id}/edit`} className="btn btn-light btn-sm">✏️ Edit</Link>
            <button className="btn btn-danger btn-sm" onClick={handleDeleteVerse}>🗑 Delete</button>
          </div>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-1">
            <p className="fst-italic fs-5">"{verse.text}"</p>
            <footer className="blockquote-footer mt-1">
              {verse.book_name} {verse.chapter}:{verse.verse_num}
              <span className={`badge ms-2 ${verse.testament === 'OT' ? 'bg-warning text-dark' : 'bg-success'}`}>
                {verse.testament}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Notes */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">📝 Personal Notes ({notes.length})</h5>
        </div>
        <div className="card-body">
          {notes.length === 0 && <p className="text-muted fst-italic mb-3">No notes yet. Add one below.</p>}
          <div className="list-group mb-4">
            {notes.map(note => (
              <div className="list-group-item" key={note.note_id}>
                {editingId === note.note_id ? (
                  <>
                    <textarea className="form-control mb-2" rows={2} value={editText} onChange={e => setEditText(e.target.value)} />
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => handleSaveEdit(note)}>Save</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1">{note.note_text}</p>
                      <small className="text-muted">{new Date(note.created_at).toLocaleString()}</small>
                    </div>
                    <div className="d-flex gap-2 ms-2 flex-shrink-0">
                      <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => { setEditingId(note.note_id); setEditText(note.note_text); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteNote(note)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <h6 className="fw-semibold">Add a Note</h6>
          <textarea className="form-control mb-2" rows={3} value={newNote}
            onChange={e => setNewNote(e.target.value)} placeholder="Write your personal reflection or study note..." />
          <button className="btn btn-primary" onClick={handleAddNote} disabled={!newNote.trim()}>💾 Save Note</button>
        </div>
      </div>
    </div>
  );
}
