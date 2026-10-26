import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { CircularProgress } from './CircularProgress';
import type { CircularProgressColor, CircularProgressSize } from './CircularProgress.types';

const progressColors: readonly CircularProgressColor[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const progressSizes: readonly CircularProgressSize[] = ['sm', 'md', 'lg', 'xl'];

export function CircularProgressStory() {
  return (
    <Stack spacing="xl">
      <Example title="Indeterminate colours">
        <Stack direction="row" spacing="lg" alignItems="center">
          {progressColors.map((color) => (
            <CircularProgress key={color} color={color} aria-label={`${color} progress`} />
          ))}
        </Stack>
      </Example>
      <Example title="Sizes">
        <Stack direction="row" spacing="lg" alignItems="center">
          {progressSizes.map((size) => (
            <CircularProgress key={size} size={size} aria-label={`${size} progress`} />
          ))}
        </Stack>
      </Example>
      <Example title="Determinate">
        <Stack direction="row" spacing="lg" alignItems="center">
          {[0, 25, 50, 75, 100].map((value) => (
            <CircularProgress
              key={value}
              variant="determinate"
              value={value}
              size="xl"
              aria-label={`${value} percent`}
            />
          ))}
        </Stack>
      </Example>
    </Stack>
  );
}

export const circularProgressStory: Story = {
  id: 'circular-progress',
  title: 'CircularProgress',
  render: () => <CircularProgressStory />,
};
