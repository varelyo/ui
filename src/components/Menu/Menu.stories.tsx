import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { MenuItem } from '../MenuItem';
import { Menu } from './Menu';
import type { MenuCloseReason } from './Menu.types';

const orders = ['Name', 'Created', 'Updated', 'Size'] as const;

export function MenuStory() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [sortAnchor, setSortAnchor] = useState<HTMLButtonElement | null>(null);
  const [order, setOrder] = useState<(typeof orders)[number]>('Updated');
  const [action, setAction] = useState('none');
  const [reason, setReason] = useState<MenuCloseReason | 'none'>('none');
  const choose = (name: string) => () => {
    setAction(name);
    setAnchor(null);
  };
  return (
    <Stack spacing="xl">
      <Example title="Actions with icons, a separator and a disabled item">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button
            id="actions-button"
            variant="outlined"
            endIcon={<Icon name="chevron-down" />}
            aria-haspopup="menu"
            aria-expanded={anchor ? 'true' : 'false'}
            aria-controls={anchor ? 'actions-menu' : undefined}
            onClick={(event) => setAnchor(anchor ? null : event.currentTarget)}
            data-testid="menu-open"
          >
            Actions
          </Button>
          <Menu
            id="actions-menu"
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={(_, closeReason) => {
              setReason(closeReason);
              setAnchor(null);
            }}
            data-testid="menu"
          >
            <MenuItem icon={<Icon name="edit" />} onClick={choose('rename')}>
              Rename
            </MenuItem>
            <MenuItem icon={<Icon name="copy" />} onClick={choose('duplicate')}>
              Duplicate
            </MenuItem>
            <MenuItem icon={<Icon name="link" />} disabled onClick={choose('share')}>
              Share
            </MenuItem>
            <MenuItem icon={<Icon name="download" />} onClick={choose('download')}>
              Download
            </MenuItem>
            <Divider data-testid="menu-separator" />
            <MenuItem icon={<Icon name="trash" />} onClick={choose('delete')}>
              Delete
            </MenuItem>
          </Menu>
          <Button variant="text" data-testid="menu-after">
            Export
          </Button>
          <Typography variant="body-sm" data-testid="menu-action">
            {action}
          </Typography>
          <Typography variant="body-sm" data-testid="menu-reason">
            {reason}
          </Typography>
        </Stack>
      </Example>
      <Example title="The selected item receives focus when the menu opens">
        <Stack direction="row">
          <Button
            id="sort-button"
            variant="text"
            endIcon={<Icon name="chevrons-up-down" />}
            aria-haspopup="menu"
            aria-expanded={sortAnchor ? 'true' : 'false'}
            onClick={(event) => setSortAnchor(sortAnchor ? null : event.currentTarget)}
            data-testid="sort-open"
          >
            {`Sort by ${order.toLowerCase()}`}
          </Button>
        </Stack>
        <Menu
          open={Boolean(sortAnchor)}
          anchorEl={sortAnchor}
          onClose={() => setSortAnchor(null)}
          data-testid="sort-menu"
        >
          {orders.map((name) => (
            <MenuItem
              key={name}
              selected={name === order}
              onClick={() => {
                setOrder(name);
                setSortAnchor(null);
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Menu>
      </Example>
    </Stack>
  );
}

export const menuStory: Story = {
  id: 'menu',
  title: 'Menu',
  render: () => <MenuStory />,
};
