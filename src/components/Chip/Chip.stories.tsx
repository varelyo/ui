import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Avatar } from '../Avatar';
import { Chip } from './Chip';
import type { ChipColor, ChipSize, ChipVariant } from './Chip.types';

const colors: readonly ChipColor[] = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const variants: readonly ChipVariant[] = ['filled', 'outlined'];
const sizes: readonly ChipSize[] = ['sm', 'md', 'lg'];

export function ChipStory() {
  const [tags, setTags] = useState(['Design', 'Research', 'Billing']);
  const [clicks, setClicks] = useState(0);
  return (
    <Stack spacing="xl">
      <Example title="Variants and colours">
        <Stack spacing="sm">
          {variants.map((variant) => (
            <Stack key={variant} direction="row" spacing="sm" alignItems="center">
              {colors.map((color) => (
                <Chip
                  key={color}
                  variant={variant}
                  color={color}
                  label={color}
                  data-testid={`chip-${variant}-${color}`}
                />
              ))}
              <Chip
                variant={variant}
                label="disabled"
                disabled
                onClick={() => undefined}
                data-testid={`chip-${variant}-disabled`}
              />
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="Sizes with an icon and an avatar">
        <Stack direction="row" spacing="sm" alignItems="center">
          {sizes.map((size) => (
            <Chip key={size} size={size} icon={<Icon name="star" />} label={`Starred ${size}`} />
          ))}
          <Chip
            avatar={<Avatar size="sm">MH</Avatar>}
            label="Mira Holt"
            variant="outlined"
            data-testid="chip-avatar"
          />
        </Stack>
      </Example>
      <Example title="Clickable and deletable chips keep their actions separate">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Chip
            label="Clickable"
            onClick={() => setClicks((count) => count + 1)}
            data-testid="chip-clickable"
          />
          <Typography variant="body-sm" data-testid="chip-clicks">
            {clicks}
          </Typography>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              color="secondary"
              onDelete={() => setTags((list) => list.filter((item) => item !== tag))}
              data-testid={`chip-tag-${tag}`}
            />
          ))}
          <Chip
            label="Clickable and deletable"
            onClick={() => setClicks((count) => count + 1)}
            onDelete={() => setClicks((count) => count + 10)}
            data-testid="chip-both"
          />
        </Stack>
      </Example>
    </Stack>
  );
}

export const chipStory: Story = {
  id: 'chip',
  title: 'Chip',
  render: () => <ChipStory />,
};
