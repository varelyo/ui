import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Button } from '../../components/Button';
import { Stack } from '../Stack';
import { Container } from './Container';

export function ContainerWidthExample() {
  return (
    <Example title="Container: sm and fixed md">
      <Stack spacing="sm">
        <Container maxWidth="sm" data-testid="container">
          <Button variant="outlined" fullWidth>
            maxWidth sm
          </Button>
        </Container>
        <Container maxWidth="md" fixed>
          <Button variant="outlined" fullWidth>
            fixed md
          </Button>
        </Container>
        <Container maxWidth={false} disableGutters>
          <Button variant="outlined" fullWidth>
            No maximum, no gutters
          </Button>
        </Container>
      </Stack>
    </Example>
  );
}

export function ContainerStory() {
  return (
    <Stack spacing="xl">
      <ContainerWidthExample />
    </Stack>
  );
}

export const containerStory: Story = {
  id: 'container',
  title: 'Container',
  render: () => <ContainerStory />,
};
