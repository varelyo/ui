import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { LinearProgress } from './LinearProgress';
import type { LinearProgressColor, LinearProgressSize } from './LinearProgress.types';

const progressColors: readonly LinearProgressColor[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const progressSizes: readonly LinearProgressSize[] = ['sm', 'md', 'lg', 'xl'];
const progressValues = [0, 25, 50, 75, 100] as const;

export function LinearProgressStory() {
  const [uploaded, setUploaded] = useState(1);
  return (
    <Stack spacing="xl">
      <Example title="Indeterminate colours">
        <Stack spacing="md">
          {progressColors.map((color) => (
            <LinearProgress
              key={color}
              color={color}
              aria-label={`${color} progress`}
              data-testid={`linear-progress-${color}`}
            />
          ))}
        </Stack>
      </Example>
      <Example title="Sizes">
        <Stack spacing="md">
          {progressSizes.map((size) => (
            <LinearProgress
              key={size}
              variant="determinate"
              value={60}
              size={size}
              aria-label={`${size} progress`}
              data-testid={`linear-progress-${size}`}
            />
          ))}
          <LinearProgress
            variant="determinate"
            value={60}
            size={{ xs: 'sm', md: 'xl' }}
            aria-label="responsive progress"
            data-testid="linear-progress-responsive"
          />
        </Stack>
      </Example>
      <Example title="Determinate">
        <Stack spacing="md">
          {progressValues.map((value) => (
            <LinearProgress
              key={value}
              variant="determinate"
              value={value}
              aria-label={`${value} percent`}
              data-testid={`linear-progress-value-${value}`}
            />
          ))}
        </Stack>
      </Example>
      <Example title="Labelled by the text above it">
        <Stack spacing="sm">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body-sm" id="upload-progress-label">
              {`Uploading ${uploaded} of 4 files`}
            </Typography>
            <Button
              size="sm"
              variant="outlined"
              onClick={() => setUploaded((count) => (count === 4 ? 0 : count + 1))}
              data-testid="linear-progress-advance"
            >
              Next file
            </Button>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={uploaded * 25}
            color="success"
            aria-labelledby="upload-progress-label"
            data-testid="linear-progress-upload"
          />
        </Stack>
      </Example>
    </Stack>
  );
}

export const linearProgressStory: Story = {
  id: 'linear-progress',
  title: 'LinearProgress',
  render: () => <LinearProgressStory />,
};
