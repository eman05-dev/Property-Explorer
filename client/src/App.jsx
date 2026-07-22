import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import DetailsPage from './pages/DetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#2b2622',
              color: '#f4ede4',
              border: '1px solid #c17a4e',
            },
          }}
        />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/properties/:id" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
