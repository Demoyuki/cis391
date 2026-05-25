import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import VerseList from './components/VerseList/VerseList';
import VerseDetail from './components/VerseDetail/VerseDetail';
import VerseForm from './components/VerseForm/VerseForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                   element={<Navigate to="/verses" replace />} />
          <Route path="/verses"             element={<VerseList />} />
          <Route path="/verses/new"         element={<VerseForm />} />
          <Route path="/verses/:id"         element={<VerseDetail />} />
          <Route path="/verses/:id/edit"    element={<VerseForm />} />
          <Route path="*"                   element={<Navigate to="/verses" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
