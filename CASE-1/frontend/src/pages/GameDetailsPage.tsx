import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, Game, PurchaseResponse } from '../api/client';
import { useAuth } from '../context/AuthContext';

type Status = 'idle' | 'loading' | 'purchasing';

export const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true, state: { from: `/games/${id}` } });
    }
  }, [isAuthenticated, navigate, id]);

  useEffect(() => {
    if (!id || !token) return;
    setStatus('loading');
    Promise.all([api.fetchGame(id, token), api.fetchAccess(id, token)])
      .then(([gameData, accessData]) => {
        setGame(gameData);
        setHasAccess(accessData.hasAccess);
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setStatus('idle'));
  }, [id, token]);

  const handlePurchase = async () => {
    if (!token || !game) return;
    setStatus('purchasing');
    setMessage(null);
    try {
      const res: PurchaseResponse = await api.purchase(game.id, token);
      if (res.status === 'already_owned' || res.status === 'purchased') {
        setHasAccess(true);
        setMessage('Purchase confirmed. Access unlocked.');
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setStatus('idle');
    }
  };

  if (!game && status === 'loading') {
    return (
      <div className="min-h-screen bg-midnight px-6 pt-24 text-white">
        <p>Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-midnight px-6 pt-24 text-white">
        <p>Game not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight px-6 pt-24 text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="rounded-xl border border-white/5 bg-white/5 p-6 shadow-lg">
          <p className="text-sm text-white/60">{game.difficulty}</p>
          <h1 className="mt-2 text-3xl font-semibold">{game.title}</h1>
          <p className="mt-3 text-white/70">
            {game.description || 'Detailed case briefing will appear here soon.'}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-md bg-white/10 px-3 py-1 text-sm">
              {game.isFree ? 'Free' : `₹${Number(game.price).toFixed(2)}`}
            </span>
            {hasAccess ? (
              <span className="rounded-md bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200">
                Unlocked
              </span>
            ) : (
              <span className="rounded-md bg-red-500/20 px-3 py-1 text-sm text-red-200">
                Locked
              </span>
            )}
          </div>
          <div className="mt-6 flex gap-3">
            {hasAccess || game.isFree ? (
              <button className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-black">
                Play Game (soon)
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                disabled={status === 'purchasing'}
                className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'purchasing' ? 'Processing...' : 'Buy to Unlock'}
              </button>
            )}
            <button
              onClick={() => navigate('/games')}
              className="rounded-md border border-white/10 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
            >
              Back to Games
            </button>
          </div>
          {message && <p className="mt-4 text-sm text-white/80">{message}</p>}
        </div>
      </div>
    </div>
  );
};

