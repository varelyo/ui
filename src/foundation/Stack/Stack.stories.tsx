import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Button } from '../../components/Button';
import { Icon } from '../Icon';
import { Stack } from './Stack';

export function StackDirectionExample() {
  return (
    <Example title="Stack: row from md, [row, column] spacing and a divider">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: ['xs', 'none'], md: 'md' }}
        divider={<Icon name="chevron-right" size="sm" color="on-surface-variant-default" />}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        data-testid="stack"
      >
        <Button variant="outlined">Brief</Button>
        <Button variant="outlined">Direction</Button>
        <Button variant="outlined">Build</Button>
      </Stack>
    </Example>
  );
}

export function StackPaddingExample() {
  return (
    <Example title="Stack padding shorthand: top md only on phones, lg on every side from sm">
      <Stack p={{ xs: ['md', 'none', 'none'], sm: 'lg' }} data-testid="padded">
        <Button variant="outlined">Padded content</Button>
      </Stack>
    </Example>
  );
}

export function StackDisplayExample() {
  return (
    <Example title="Display: visible only from md">
      <Stack direction="row" spacing="sm">
        <Button variant="text">Always</Button>
        <Stack display={{ xs: 'none', md: 'flex' }} data-testid="desktop-only">
          <Button variant="text">Desktop only</Button>
        </Stack>
        <Stack display={{ xs: 'flex', md: 'none' }} data-testid="phone-only">
          <Button variant="text">Phone only</Button>
        </Stack>
      </Stack>
    </Example>
  );
}

export function StackStory() {
  return (
    <Stack spacing="xl">
      <StackDirectionExample />
      <StackPaddingExample />
      <StackDisplayExample />
    </Stack>
  );
}

export const stackStory: Story = {
  id: 'stack',
  title: 'Stack',
  render: () => <StackStory />,
};
