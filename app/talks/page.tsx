import { Heading } from '@/components/typography/heading';
import reactNorway2025 from './2025-react-norway.jpeg';
import { TalkCard } from './talk-card';

export default function TalksPage() {
  return (
    <div>
      <Heading level={1}>Talks</Heading>
      <div className="mt-8">
        <Heading level={2}>2025</Heading>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TalkCard
            href="https://www.youtube.com/live/-H7OdGaxgmM?si=GcW42CoBdpOX5ZRo"
            image={reactNorway2025}
            title="Demystifying React's Server Functions"
            conference="React Norway 2025, Oslo"
            tags={['React']}
          />
        </div>
      </div>
    </div>
  );
}
