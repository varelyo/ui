import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { Skeleton } from './Skeleton';
import type { SkeletonSize, SkeletonVariant } from './Skeleton.types';

const variants: readonly SkeletonVariant[] = ['text', 'rectangular', 'rounded', 'circular'];
const sizes: readonly SkeletonSize[] = ['sm', 'md', 'lg'];

export function SkeletonStory() {
  return (
    <Stack spacing="xl">
      <Example title="Shapes and sizes, without animation">
        <Stack spacing="lg">
          {variants.map((variant) => (
            <Stack key={variant} direction="row" spacing="lg" alignItems="center">
              {sizes.map((size) => (
                <Stack key={size} spacing="xs">
                  <Skeleton
                    variant={variant}
                    size={size}
                    animation={false}
                    data-testid={`skeleton-${variant}-${size}`}
                  />
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="A loading card">
        <Stack direction="row">
          <Paper variant="outlined">
            <Stack p="lg" spacing="md" direction="row" alignItems="center">
              <Skeleton variant="circular" animation="wave" data-testid="skeleton-wave" />
              <Stack spacing="xs">
                <Skeleton data-testid="skeleton-pulse" />
                <Skeleton size="sm" />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Example>
      <Example title="Sized by its children">
        <Stack direction="row" spacing="md" alignItems="center">
          <Skeleton variant="rounded" animation={false} data-testid="skeleton-children">
            <Button variant="contained">Invite teammates</Button>
          </Skeleton>
          <Typography variant="body-sm" color="on-surface-variant-default">
            The skeleton takes the button's size.
          </Typography>
        </Stack>
      </Example>
    </Stack>
  );
}

export const skeletonStory: Story = {
  id: 'skeleton',
  title: 'Skeleton',
  render: () => <SkeletonStory />,
};
