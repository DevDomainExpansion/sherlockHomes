import { Hero } from '../components/Hero';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <Hero />
      <section className="bg-black/60 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {[
            { title: 'Narrative-first', desc: 'Every mystery is written to feel like a case file.' },
            { title: 'Co-op friendly', desc: 'Invite friends to inspect clues and solve faster.' },
            { title: 'Secure access', desc: 'Purchases unlock digital content with your account.' }
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-white/5 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-accent">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

