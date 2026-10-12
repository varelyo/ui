import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Paper } from '../Paper';
import { SidebarItem } from './SidebarItem';

export function SidebarItemStory() {
  return (
    <Example title="Sidebar items: default, selected, disabled, as a link and without an icon">
      <Stack direction="row">
        <Paper variant="outlined">
          <Stack p="xs" spacing="2xs">
            <SidebarItem icon={<Icon name="dashboard" />}>Overview</SidebarItem>
            <SidebarItem icon={<Icon name="folder" />} selected data-testid="item-selected">
              Projects
            </SidebarItem>
            <SidebarItem icon={<Icon name="lock" />} disabled>
              Archive
            </SidebarItem>
            <SidebarItem href="#billing" icon={<Icon name="payment-card" />}>
              Billing
            </SidebarItem>
            <SidebarItem>Without an icon</SidebarItem>
          </Stack>
        </Paper>
      </Stack>
    </Example>
  );
}

export const sidebarItemStory: Story = {
  id: 'sidebar-item',
  title: 'SidebarItem',
  render: () => <SidebarItemStory />,
};
