import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { ListSubheader } from '../ListSubheader';
import { Paper } from '../Paper';
import { SidebarItem } from '../SidebarItem';
import { SidebarContent } from './SidebarContent';

export function SidebarContentStory() {
  return (
    <Example title="SidebarContent with its section inset and the list it holds">
      <Stack direction="row">
        <Paper variant="outlined">
          <SidebarContent data-testid="sidebar-content-part">
            <ListSubheader>Workspace</ListSubheader>
            <SidebarItem icon={<Icon name="dashboard" />} selected>
              Overview
            </SidebarItem>
            <SidebarItem icon={<Icon name="folder" />} end="4">
              Projects
            </SidebarItem>
          </SidebarContent>
        </Paper>
      </Stack>
    </Example>
  );
}

export const sidebarContentStory: Story = {
  id: 'sidebar-content',
  title: 'SidebarContent',
  render: () => <SidebarContentStory />,
};
