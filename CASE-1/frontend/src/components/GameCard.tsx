import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Game } from '../api/client';

type Props = {
  game: Game;
};

export const GameCard = ({ game }: Props) => {
  return (
    <motion.div
      className="flex flex-col rounded-xl border border-white/5 bg-white/5 p-6 shadow-lg backdrop-blur"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between text-sm text-white/70">
        <span className="rounded-md bg-white/10 px-2 py-1 text-xs">{game.difficulty}</span>
        <span
          className={`rounded-md px-2 py-1 text-xs ${
            game.isFree ? 'bg-emerald-500/20 text-emerald-200' : 'bg-accent/20 text-accent'
          }`}
        >
          {game.isFree ? 'Free' : 'Paid'}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{game.title}</h3>
      <p className="mt-2 flex-1 text-sm text-white/70">
        {game.description || 'Dive into clues, interrogate suspects, and piece together the story.'}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-accent">
          {game.isFree ? 'Free' : `₹${Number(game.price).toFixed(2)}`}
        </p>
        <Link
          to={`/games/${game.id}`}
          className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
};

