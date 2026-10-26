import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Paper } from '../Paper';
import { SidebarHeader } from './SidebarHeader';

export function SidebarHeaderStory() {
  return (
    <Example title="SidebarHeader with its section inset and gap">
      <Stack direction="row">
        <Paper variant="outlined">
          <SidebarHeader data-testid="sidebar-header-part">
            <Typography variant="label-md">First line</Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              Second line
            </Typography>
          </SidebarHeader>
        </Paper>
      </Stack>
    </Example>
  );
}

export const sidebarHeaderStory: Story = {
  id: 'sidebar-header',
  title: 'SidebarHeader',
  render: () => <SidebarHeaderStory />,
};
