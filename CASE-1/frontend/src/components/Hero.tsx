import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-b from-midnight to-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1b2b4b,transparent_35%)]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 py-10">
        <motion.p
          className="text-sm uppercase tracking-[0.3em] text-white/60"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Digital detective experiences
        </motion.p>
        <motion.h1
          className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We build immersive digital detective & puzzle games
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Solve intricate cases, unravel conspiracies, and unlock hidden lore. Every purchase unlocks
          a full digital experience built for sleuths and puzzle lovers.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/games"
            className="rounded-lg bg-accent px-5 py-3 text-base font-semibold text-black shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore Games
          </Link>
          <span className="text-white/70">Start with our featured case today.</span>
        </motion.div>
      </div>
    </section>
  );
};

