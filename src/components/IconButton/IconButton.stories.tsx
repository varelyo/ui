import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { Tooltip } from '../Tooltip';
import { IconButton } from './IconButton';
import type { IconButtonColor, IconButtonSize, IconButtonVariant } from './IconButton.types';

const variants: readonly IconButtonVariant[] = ['text', 'contained', 'outlined'];
const colors: readonly IconButtonColor[] = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const sizes: readonly IconButtonSize[] = ['sm', 'md', 'lg'];

export function IconButtonStory() {
  const [count, setCount] = useState(0);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [action, setAction] = useState('none');
  const choose = (name: string) => () => {
    setAction(name);
    setAnchor(null);
  };
  return (
    <Stack spacing="xl">
      <Example title="Variants and colours">
        <Stack spacing="sm">
          {variants.map((variant) => (
            <Stack key={variant} direction="row" spacing="sm" alignItems="center">
              {colors.map((color) => (
                <IconButton
                  key={color}
                  variant={variant}
                  color={color}
                  aria-label={`Settings, ${variant} ${color}`}
                >
                  <Icon name="settings" />
                </IconButton>
              ))}
              <IconButton variant={variant} disabled aria-label={`Settings, ${variant} disabled`}>
                <Icon name="settings" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="Sizes line up with a Button of the same size">
        <Stack spacing="sm">
          {sizes.map((size) => (
            <Stack key={size} direction="row" spacing="sm" alignItems="center">
              <IconButton
                size={size}
                aria-label={`Add, ${size}`}
                data-testid={`icon-button-${size}`}
              >
                <Icon name="add" />
              </IconButton>
              <Button size={size} variant="outlined" data-testid={`button-${size}`}>
                {`Create ${size}`}
              </Button>
              <IconButton
                size={size}
                variant="outlined"
                aria-label={`More actions, ${size}`}
                data-testid={`icon-button-outlined-${size}`}
              >
                <Icon name="more-horizontal" />
              </IconButton>
              <IconButton
                size={size}
                variant="contained"
                color="primary"
                aria-label={`Edit, ${size}`}
                data-testid={`icon-button-contained-${size}`}
              >
                <Icon name="edit" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="Loading keeps the accessible name">
        <Stack direction="row" spacing="sm" alignItems="center">
          {sizes.map((size) => (
            <IconButton key={size} size={size} loading aria-label={`Refreshing, ${size}`}>
              <Icon name="refresh" />
            </IconButton>
          ))}
          <IconButton variant="contained" color="primary" loading aria-label="Saving">
            <Icon name="check" />
          </IconButton>
          <IconButton variant="outlined" loading aria-label="Syncing">
            <Icon name="refresh" />
          </IconButton>
        </Stack>
      </Example>
      <Example title="A row's menu trigger and a toolbar">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Typography variant="body-md">Ada Lovelace</Typography>
          <IconButton
            id="member-actions"
            size="sm"
            aria-label="Actions for Ada Lovelace"
            aria-haspopup="menu"
            aria-expanded={anchor ? 'true' : 'false'}
            aria-controls={anchor ? 'member-menu' : undefined}
            onClick={(event) => setAnchor(anchor ? null : event.currentTarget)}
            data-testid="menu-trigger"
          >
            <Icon name="more-horizontal" />
          </IconButton>
          <Menu
            id="member-menu"
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            placement="bottom-end"
          >
            <MenuItem icon={<Icon name="users" />} onClick={choose('role')}>
              Change role
            </MenuItem>
            <MenuItem icon={<Icon name="trash" />} onClick={choose('remove')}>
              Remove from workspace
            </MenuItem>
          </Menu>
          <Typography variant="body-sm" data-testid="menu-action">
            {action}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="xs" alignItems="center">
          <IconButton aria-label="Open navigation">
            <Icon name="menu" />
          </IconButton>
          <Tooltip title="Copy link">
            <IconButton aria-label="Copy link" data-testid="copy">
              <Icon name="copy" />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="Close">
            <Icon name="close" />
          </IconButton>
        </Stack>
      </Example>
      <Example title="Interaction">
        <Stack direction="row" spacing="sm" alignItems="center">
          <IconButton
            aria-label="Add one"
            onClick={() => setCount((value) => value + 1)}
            data-testid="counter"
          >
            <Icon name="add" />
          </IconButton>
          <IconButton
            aria-label="Add a hundred"
            disabled
            onClick={() => setCount((value) => value + 100)}
            data-testid="disabled"
          >
            <Icon name="add" />
          </IconButton>
          <IconButton
            aria-label="Busy"
            loading
            onClick={() => setCount((value) => value + 100)}
            data-testid="busy"
          >
            <Icon name="add" />
          </IconButton>
          <IconButton href="#settings" aria-label="Settings" data-testid="link">
            <Icon name="settings" />
          </IconButton>
          <IconButton
            component="div"
            aria-label="Custom element"
            onClick={() => setCount((value) => value + 1)}
            data-testid="custom"
          >
            <Icon name="star" />
          </IconButton>
          <Typography id="download-report" variant="body-sm">
            Download report
          </Typography>
          <IconButton aria-labelledby="download-report" data-testid="labelled-by">
            <Icon name="download" />
          </IconButton>
          <Typography variant="body-sm" data-testid="count">
            {`Activated ${count}`}
          </Typography>
        </Stack>
      </Example>
      <Example title="Responsive size">
        <Stack direction="row">
          <IconButton size={{ xs: 'sm', md: 'lg' }} aria-label="Search" data-testid="responsive">
            <Icon name="search" />
          </IconButton>
        </Stack>
      </Example>
    </Stack>
  );
}

export const iconButtonStory: Story = {
  id: 'icon-button',
  title: 'IconButton',
  render: () => <IconButtonStory />,
};
