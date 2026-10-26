import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { MenuItem } from './MenuItem';

export function MenuItemStory() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(true);
  return (
    <Example title="Menu items: with an icon, selected, disabled, as a link and with a long label">
      <Stack direction="row">
        <Button
          ref={setAnchor}
          variant="outlined"
          onClick={() => setOpen((value) => !value)}
          data-testid="menu-item-open"
        >
          Account
        </Button>
        <Menu open={open} anchorEl={anchor} onClose={() => setOpen(false)} aria-label="Account">
          <MenuItem icon={<Icon name="user" />}>Profile</MenuItem>
          <MenuItem icon={<Icon name="settings" />} selected>
            Preferences
          </MenuItem>
          <MenuItem icon={<Icon name="lock" />} disabled>
            Security
          </MenuItem>
          <MenuItem href="#billing" icon={<Icon name="payment-card" />}>
            Billing
          </MenuItem>
          <MenuItem>Notifications for every project you follow, including archived ones</MenuItem>
        </Menu>
      </Stack>
    </Example>
  );
}

export const menuItemStory: Story = {
  id: 'menu-item',
  title: 'MenuItem',
  render: () => <MenuItemStory />,
};
