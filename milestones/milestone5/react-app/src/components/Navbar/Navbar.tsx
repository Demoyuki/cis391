import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          ✝ Bible Verse Searcher
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/verses">
                📖 Verses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/verses/new">
                ➕ Add Verse
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
