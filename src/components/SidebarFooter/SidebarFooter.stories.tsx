import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Paper } from '../Paper';
import { SidebarFooter } from './SidebarFooter';

export function SidebarFooterStory() {
  return (
    <Example title="SidebarFooter with its section inset and gap">
      <Stack direction="row">
        <Paper variant="outlined">
          <SidebarFooter data-testid="sidebar-footer-part">
            <Typography variant="label-md">First line</Typography>
            <Typography variant="body-sm" color="on-surface-variant-default">
              Second line
            </Typography>
          </SidebarFooter>
        </Paper>
      </Stack>
    </Example>
  );
}

export const sidebarFooterStory: Story = {
  id: 'sidebar-footer',
  title: 'SidebarFooter',
  render: () => <SidebarFooterStory />,
};
