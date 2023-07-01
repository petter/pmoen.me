import { Heading } from '../components/typography/heading';
import { AnimatedHexagonPattern } from './_jumbotron/animated-hexagon-pattern/animated-hexagon-pattern';

export default function Home() {
  return (
    <div>
      <AnimatedHexagonPattern width={400} height={400} hexagonRadius={20} />
      <Heading level={1}>Petter Sæther Moen</Heading>
      <Heading level={2}>Petter Sæther Moen</Heading>
      <Heading level={3}>Petter Sæther Moen</Heading>
      <Heading level={4}>Petter Sæther Moen</Heading>
      <Heading level={5}>Petter Sæther Moen</Heading>
      <Heading level={6}>Petter Sæther Moen</Heading>
    </div>
  );
}
