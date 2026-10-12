import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Divider } from './Divider';
import type { DividerVariant } from './Divider.types';

const dividerVariants: readonly DividerVariant[] = ['fullWidth', 'inset', 'middle'];

export function DividerStory() {
  return (
    <Stack spacing="xl">
      <Example title="Variants">
        <Stack spacing="md">
          {dividerVariants.map((variant) => (
            <Stack key={variant} spacing="sm">
              <Typography variant="body-md">{variant}</Typography>
              <Divider variant={variant} data-testid={`divider-${variant}`} />
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="With a label">
        <Stack spacing="md">
          <Divider data-testid="divider-label">or</Divider>
          <Divider variant="middle">Continue with email</Divider>
          <Divider>
            A long separator label that keeps the lines on both sides even when it takes most of the
            width
          </Divider>
        </Stack>
      </Example>
      <Example title="Vertical">
        <Stack direction="row" spacing="md" alignItems="center">
          <Typography variant="body-md">Inbox</Typography>
          <Divider orientation="vertical" flexItem data-testid="divider-vertical" />
          <Typography variant="body-md">Drafts</Typography>
        </Stack>
        <Stack direction="row" spacing="md">
          <Stack spacing="2xs">
            <Typography variant="title-sm">Sign in</Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              With your work account
            </Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              Single sign-on applies
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem data-testid="divider-vertical-label">
            or
          </Divider>
          <Stack spacing="2xs">
            <Typography variant="title-sm">Create an account</Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              Free for small teams
            </Typography>
          </Stack>
        </Stack>
      </Example>
      <Example title="In a list">
        <Stack component="ul" spacing="sm">
          <Typography component="li" variant="body-md">
            First item
          </Typography>
          <Divider component="li" variant="inset" data-testid="divider-li" />
          <Typography component="li" variant="body-md">
            Second item
          </Typography>
          <Divider component="li" role="presentation" data-testid="divider-decorative" />
        </Stack>
      </Example>
    </Stack>
  );
}

export const dividerStory: Story = {
  id: 'divider',
  title: 'Divider',
  render: () => <DividerStory />,
};
