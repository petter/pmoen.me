import { TalkItem } from './talk-item';

export default function TalksPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-light tracking-tight text-stone-50 sm:text-5xl">
        Talks
      </h1>
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
