import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BibleBook } from '../../models/types';
import { getBooks, getVerseById, createVerse, updateVerse } from '../../services/verseService';

export default function VerseForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [books, setBooks]         = useState<BibleBook[]>([]);
  const [bookId, setBookId]       = useState(0);
  const [chapter, setChapter]     = useState(1);
  const [verseNum, setVerseNum]   = useState(1);
  const [text, setText]           = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    getBooks().then(setBooks);
    if (isEdit && id) {
      getVerseById(Number(id)).then(v => {
        setBookId(v.book_id); setChapter(v.chapter); setVerseNum(v.verse_num); setText(v.text);
      });
    }
  }, [id, isEdit]);

  const isValid = bookId > 0 && chapter > 0 && verseNum > 0 && text.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true); setError('');
    try {
      const dto = { book_id: bookId, chapter, verse_num: verseNum, text };
      const saved = isEdit ? await updateVerse(Number(id), dto) : await createVerse(dto);
      navigate(`/verses/${saved.id}`);
    } catch {
      setError('Failed to save. Please check all fields.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">{isEdit ? '✏️ Edit Verse' : '➕ Add New Verse'}</h4>
            </div>
            <div className="card-body p-4">

              <div className="mb-3">
                <label className="form-label fw-semibold">Book *</label>
                <select className="form-select" value={bookId} onChange={e => setBookId(Number(e.target.value))}>
                  <option value={0} disabled>Select a book...</option>
                  {books.map(b => (
                    <option key={b.book_id} value={b.book_id}>{b.book_name} ({b.testament})</option>
                  ))}
                </select>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Chapter *</label>
                  <input type="number" className="form-control" value={chapter} min={1}
                    onChange={e => setChapter(Number(e.target.value))} />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">Verse Number *</label>
                  <input type="number" className="form-control" value={verseNum} min={1}
                    onChange={e => setVerseNum(Number(e.target.value))} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Verse Text *</label>
                <textarea className="form-control" rows={5} value={text}
                  onChange={e => setText(e.target.value)} placeholder="Enter the full verse text..." />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-flex gap-3">
                <button className="btn btn-primary px-4" onClick={handleSubmit} disabled={submitting || !isValid}>
                  {submitting && <span className="spinner-border spinner-border-sm me-2" />}
                  {isEdit ? 'Save Changes' : 'Add Verse'}
                </button>
                <Link to="/verses" className="btn btn-outline-secondary">Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
