import reactNorway2025 from './2025-react-norway.jpeg';
import { TalkCard } from './talk-card';

export default function TalksPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-light tracking-tight text-stone-50 sm:text-5xl">
        Talks
      </h1>
      <section className="mt-12">
        <h2 className="text-sm tracking-wide text-stone-500 uppercase">2025</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TalkCard
            href="https://www.youtube.com/live/-H7OdGaxgmM?si=GcW42CoBdpOX5ZRo"
            image={reactNorway2025}
            title="Demystifying React's Server Functions"
            conference="React Norway 2025, Oslo"
            tags={['React']}
          />
        </div>
      </section>
    </div>
  );
}
