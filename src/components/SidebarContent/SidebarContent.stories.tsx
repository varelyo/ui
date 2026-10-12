import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Paper } from '../Paper';
import { SidebarContent } from './SidebarContent';

export function SidebarContentStory() {
  return (
    <Example title="SidebarContent with its section inset and gap">
      <Stack direction="row">
        <Paper variant="outlined">
          <SidebarContent data-testid="sidebar-content-part">
            <Typography variant="label-md">First line</Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              Second line
            </Typography>
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
