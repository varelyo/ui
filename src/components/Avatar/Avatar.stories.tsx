import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Avatar } from './Avatar';
import type { AvatarColor, AvatarSize, AvatarVariant } from './Avatar.types';

const variants: readonly AvatarVariant[] = ['circular', 'rounded', 'square'];
const sizes: readonly AvatarSize[] = ['sm', 'md', 'lg'];
const colors: readonly AvatarColor[] = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const photo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><rect width='8' height='8' fill='%23355a8c'/><circle cx='4' cy='3' r='1.6' fill='%23f2c9a0'/><rect x='1.5' y='5' width='5' height='3' rx='1.5' fill='%23f2c9a0'/></svg>";

export function AvatarStory() {
  return (
    <Stack spacing="xl">
      <Example title="Shapes and sizes with initials">
        <Stack spacing="md">
          {variants.map((variant) => (
            <Stack key={variant} direction="row" spacing="md" alignItems="center">
              {sizes.map((size) => (
                <Avatar
                  key={size}
                  variant={variant}
                  size={size}
                  data-testid={`avatar-${variant}-${size}`}
                >
                  MH
                </Avatar>
              ))}
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="An image, a broken image and no content at all">
        <Stack direction="row" spacing="md" alignItems="center">
          <Avatar src={photo} alt="Mira Holt" data-testid="avatar-image" />
          <Avatar src="data:image/png;base64,broken" alt="Jon Ray" data-testid="avatar-broken">
            JR
          </Avatar>
          <Avatar
            src="data:image/png;base64,broken"
            alt="Unknown person"
            data-testid="avatar-icon"
          />
          <Avatar data-testid="avatar-empty" />
        </Stack>
      </Example>
    </Stack>
  );
}

export const avatarStory: Story = {
  id: 'avatar',
  title: 'Avatar',
  render: () => <AvatarStory />,
};

export function AvatarColorStory() {
  return (
    <Example title="Colours: neutral by default and the six intents, with initials and the fallback icon">
      <Grid container columns={{ xs: 2, md: 4, lg: 7 }} spacing="lg">
        {colors.map((color) => (
          <Stack key={color} spacing="sm" alignItems="center">
            <Stack direction="row" spacing="sm" alignItems="center">
              <Avatar color={color} data-testid={`avatar-${color}`}>
                MH
              </Avatar>
              <Avatar color={color} variant="rounded" data-testid={`avatar-${color}-icon`} />
            </Stack>
            <Typography variant="label-sm" color="on-surface-variant-default">
              {color}
            </Typography>
          </Stack>
        ))}
      </Grid>
    </Example>
  );
}

export const avatarColorStory: Story = {
  id: 'avatar-color',
  title: 'Avatar colours',
  render: () => <AvatarColorStory />,
};
