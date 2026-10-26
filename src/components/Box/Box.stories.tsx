import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Paper } from '../Paper';
import { Sidebar } from '../Sidebar';
import { SidebarContent } from '../SidebarContent';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarItem } from '../SidebarItem';
import { TextField } from '../TextField';
import { Grid } from '../Grid';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Box } from './Box';

export function BoxRowExample() {
  return (
    <Example title="Box: a child fills the rest of a row, and its text truncates">
      <Grid container columns={{ xs: 1, md: 3 }}>
        <Stack direction="row" spacing="sm" alignItems="center" data-testid="member-row">
          <Avatar size="sm">AL</Avatar>
          <Box flexGrow={1} data-testid="grow-row">
            <Typography variant="body-md" noWrap>
              Ada Lovelace
            </Typography>
            <Typography
              variant="body-sm"
              color="on-surface-variant-default"
              noWrap
              data-testid="member-email"
            >
              ada.lovelace@analytical-engine-society.example.com
            </Typography>
          </Box>
          <IconButton aria-label="Actions for Ada Lovelace" data-testid="member-actions">
            <Icon name="more-horizontal" />
          </IconButton>
        </Stack>
      </Grid>
    </Example>
  );
}

export function BoxColumnExample() {
  return (
    <Example title="Box: a child fills the rest of a column">
      <Stack direction="row" spacing="lg" data-testid="plans">
        <Stack spacing="xs">
          <Typography variant="title-sm">Team</Typography>
          <Typography variant="body-sm">Unlimited projects</Typography>
          <Typography variant="body-sm">Ten members</Typography>
          <Typography variant="body-sm">Audit log</Typography>
          <Typography variant="body-sm">Priority support</Typography>
        </Stack>
        <Stack spacing="xs" data-testid="plan-column">
          <Typography variant="title-sm">Starter</Typography>
          <Typography variant="body-sm">Three projects</Typography>
          <Box flexGrow={1} data-testid="grow-column" />
          <Button variant="outlined" size="sm" data-testid="plan-action">
            Upgrade
          </Button>
        </Stack>
      </Stack>
    </Example>
  );
}

export function BoxResponsiveExample() {
  return (
    <Example title="Box: growth by width, from md">
      <Stack direction="row" spacing="sm" alignItems="flex-end">
        <Box flexGrow={{ xs: 0, md: 1 }} data-testid="grow-responsive">
          <TextField label="Email" placeholder="name@example.com" fullWidth />
        </Box>
        <Button variant="contained">Send invite</Button>
      </Stack>
    </Example>
  );
}

export function BoxStory() {
  return (
    <Stack spacing="xl">
      <BoxRowExample />
      <BoxColumnExample />
      <BoxResponsiveExample />
    </Stack>
  );
}

export const boxStory: Story = {
  id: 'box',
  title: 'Box',
  render: () => <BoxStory />,
};

export function BoxMinHeightStory() {
  return (
    <Example title="Box: a short page keeps the window's height from md, so the sidebar beside it reaches the bottom">
      <Paper variant="outlined">
        <Stack direction="row" data-testid="shell">
          <Sidebar label="Documents">
            <SidebarContent>
              <SidebarItem icon={<Icon name="file" />} selected>
                Contracts
              </SidebarItem>
              <SidebarItem icon={<Icon name="users" />}>Counterparties</SidebarItem>
              <SidebarItem icon={<Icon name="clock" />}>Renewals</SidebarItem>
            </SidebarContent>
            <SidebarFooter>
              <SidebarItem icon={<Icon name="settings" />} data-testid="shell-settings">
                Settings
              </SidebarItem>
            </SidebarFooter>
          </Sidebar>
          <Box flexGrow={1} minHeight={{ xs: 'auto', md: 'viewport' }} data-testid="shell-content">
            <Stack p="xl" spacing="sm">
              <Typography variant="title-md">Contracts</Typography>
              <Typography variant="body-md" color="on-surface-variant-default">
                No contracts match the filter.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Example>
  );
}

export const boxMinHeightStory: Story = {
  id: 'box-min-height',
  title: 'Box minimum height',
  render: () => <BoxMinHeightStory />,
};
