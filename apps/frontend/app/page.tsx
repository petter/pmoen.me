import { Heading } from '../components/typography/heading';
import { JumbotronBackground } from './_jumbotron/jumbotron-background';

export default function Home() {
  return (
    <div>
      <JumbotronBackground />
      <Heading level={1}>Petter Sæther Moen</Heading>
      <Heading level={2}>Petter Sæther Moen</Heading>
      <Heading level={3}>Petter Sæther Moen</Heading>
      <Heading level={4}>Petter Sæther Moen</Heading>
      <Heading level={5}>Petter Sæther Moen</Heading>
      <Heading level={6}>Petter Sæther Moen</Heading>
    </div>
  );
}
