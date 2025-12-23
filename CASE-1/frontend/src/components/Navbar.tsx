import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path ? 'bg-white/10 text-accent' : 'text-white/80 hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-midnight/70 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-accent">
          Sherlock Homes
        </Link>
        <div className="flex items-center gap-3">
          <Link className={linkClass('/')} to="/">
            Home
          </Link>
          <Link className={linkClass('/games')} to="/games">
            Games
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            >
              Logout
            </button>
          ) : (
            <>
              <Link className={linkClass('/login')} to="/login">
                Login
              </Link>
              <Link
                className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black hover:brightness-110"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

