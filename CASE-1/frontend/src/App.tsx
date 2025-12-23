import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { GamesPage } from './pages/GamesPage';
import { GameDetailsPage } from './pages/GameDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <div className="bg-midnight text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route
          path="/games/:id"
          element={
            <ProtectedRoute>
              <GameDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

