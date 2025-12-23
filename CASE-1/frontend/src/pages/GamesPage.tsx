import { useEffect, useState } from 'react';
import { api, Game } from '../api/client';
import { GameCard } from '../components/GameCard';

export const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .fetchGames()
      .then(setGames)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-midnight px-6 pt-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Cases</p>
          <h2 className="text-3xl font-semibold">Choose your next investigation</h2>
        </div>
        {loading && <p className="text-white/70">Loading games...</p>}
        {error && <p className="text-red-400">{error}</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

