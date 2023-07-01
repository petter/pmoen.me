import { Heading } from '../components/typography/heading';
import { Jumbotron } from './_jumbotron/jumbotron';

export default function Home() {
  return (
    <Jumbotron>
      <div className="flex h-full flex-col items-center justify-center p-4">
        <Heading
          level={1}
          className="flex flex-col items-center text-fuchsia-300 sm:text-7xl md:text-8xl"
        >
          <span className="w-min bg-blue-200/25 px-2">Petter</span>
          <span className="w-min bg-blue-200/25 px-2">Sæther</span>
          <span className="w-min bg-blue-200/25 px-2">Moen</span>
        </Heading>
      </div>
    </Jumbotron>
  );
}
