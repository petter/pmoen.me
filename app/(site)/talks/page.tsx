import { Heading } from '@/components/typography/heading';
import { TalkItem } from './talk-item';

export default function TalksPage() {
  return (
    <div>
      <Heading level={1}>Talks</Heading>
      <div className="mt-12">
        <TalkItem
          href="https://www.youtube.com/live/-H7OdGaxgmM?t=12985"
          title="Demystifying React's Server Functions"
          conference="React Norway"
          location="Oslo"
          date="June 2025"
        />
      </div>
    </div>
  );
}
