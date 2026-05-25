import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BibleVerse } from '../../models/types';
import { searchVerses, deleteVerse } from '../../services/verseService';

export default function VerseList() {
  const [verses, setVerses]     = useState<BibleVerse[]>([]);
  const [query, setQuery]       = useState('');
  const [testament, setTestament] = useState('ALL');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      setVerses(await searchVerses(query || undefined, testament));
    } catch {
      setError('Could not load verses. Is the API running on port 3000?');
    } finally { setLoading(false); }
  }, [query, testament]);

  useEffect(() => { load(); }, []);

  const handleDelete = async (verse: BibleVerse) => {
    if (!confirm(`Delete ${verse.book_name} ${verse.chapter}:${verse.verse_num}?`)) return;
    await deleteVerse(verse.id);
    setVerses(v => v.filter(x => x.id !== verse.id));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">📖 Bible Verses</h2>
        <Link to="/verses/new" className="btn btn-primary">➕ Add New Verse</Link>
      </div>

      {/* Search */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Search</label>
              <input className="form-control" value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && load()} placeholder="e.g. grace, love, shepherd..." />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Testament</label>
              <select className="form-select" value={testament} onChange={e => setTestament(e.target.value)}>
                <option value="ALL">All</option>
                <option value="OT">Old Testament</option>
                <option value="NT">New Testament</option>
              </select>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-primary w-100" onClick={load}>🔍 Search</button>
              <button className="btn btn-outline-secondary" onClick={() => { setQuery(''); setTestament('ALL'); }}>✕</button>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-5"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">Loading...</p></div>}
      {error   && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && verses.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-4">No verses found.</p>
          <Link to="/verses/new" className="btn btn-outline-primary mt-2">Add the first verse</Link>
        </div>
      )}

      {!loading && verses.length > 0 && (
        <p className="text-muted small mb-3">Showing {verses.length} verse{verses.length !== 1 ? 's' : ''}</p>
      )}

      <div className="row g-3">
        {verses.map(verse => (
          <div className="col-12" key={verse.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex gap-2 mb-1">
                    <span className="badge bg-primary">{verse.book_name} {verse.chapter}:{verse.verse_num}</span>
                    <span className={`badge ${verse.testament === 'OT' ? 'bg-warning text-dark' : 'bg-success'}`}>{verse.testament}</span>
                  </div>
                  <p className="mb-0 text-muted fst-italic">
                    "{verse.text.length > 120 ? verse.text.slice(0, 120) + '...' : verse.text}"
                  </p>
                </div>
                <div className="d-flex gap-2 ms-3 flex-shrink-0">
                  <Link to={`/verses/${verse.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                  <Link to={`/verses/${verse.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(verse)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
