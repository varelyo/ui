import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Icon, type IconName } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { SidebarContent } from '../SidebarContent';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarItem } from '../SidebarItem';
import { Sidebar } from './Sidebar';
import type { SidebarColor } from './Sidebar.types';

const destinations: readonly { name: string; icon: IconName }[] = [
  { name: 'Overview', icon: 'dashboard' },
  { name: 'Projects', icon: 'folder' },
  { name: 'Members', icon: 'users' },
  { name: 'Calendar', icon: 'calendar' },
];

const colors: readonly SidebarColor[] = ['neutral', 'primary', 'secondary'];

export function SidebarStory() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('Overview');
  return (
    <Stack spacing="xl">
      <Example title="Docked from md, a drawer below md, and an icon rail when collapsed">
        <Stack direction="row" spacing="sm">
          <Button
            variant="outlined"
            startIcon={<Icon name="sidebar" />}
            onClick={() => setCollapsed((value) => !value)}
            data-testid="sidebar-collapse"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
          <Stack display={{ xs: 'flex', md: 'none' }}>
            <Button
              variant="contained"
              startIcon={<Icon name="menu" />}
              onClick={() => setOpen(true)}
              data-testid="sidebar-menu"
            >
              Menu
            </Button>
          </Stack>
        </Stack>
        <Paper variant="outlined">
          <Stack direction="row">
            <Sidebar
              label="Workspace"
              collapsed={collapsed}
              open={open}
              onOpenChange={setOpen}
              data-testid="sidebar"
            >
              <SidebarHeader>
                <Stack direction="row" spacing="sm" alignItems="center" p={['xs', 'sm']}>
                  <Icon name="home" />
                  <Typography variant="title-sm" noWrap>
                    Harbor studio
                  </Typography>
                </Stack>
              </SidebarHeader>
              <SidebarContent>
                {destinations.map(({ name, icon }) => (
                  <SidebarItem
                    key={name}
                    icon={<Icon name={icon} />}
                    selected={current === name}
                    onClick={() => setCurrent(name)}
                    data-testid={`sidebar-item-${name}`}
                  >
                    {name}
                  </SidebarItem>
                ))}
                <SidebarItem
                  icon={<Icon name="lock" />}
                  disabled
                  data-testid="sidebar-item-disabled"
                >
                  Archive
                </SidebarItem>
                <SidebarItem
                  href="#help"
                  icon={<Icon name="help" />}
                  data-testid="sidebar-item-link"
                >
                  Help centre
                </SidebarItem>
              </SidebarContent>
              <SidebarFooter>
                <SidebarItem icon={<Icon name="settings" />}>Settings</SidebarItem>
              </SidebarFooter>
            </Sidebar>
            <Stack p="xl" spacing="sm">
              <Typography variant="title-md" data-testid="sidebar-current">
                {current}
              </Typography>
              <Typography variant="body-md" color="on-surface-variant-default">
                The page content sits beside the sidebar.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Example>
    </Stack>
  );
}

export const sidebarStory: Story = {
  id: 'sidebar',
  title: 'Sidebar',
  render: () => <SidebarStory />,
};

function ColorSidebar({ color }: { color: SidebarColor }) {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing="sm">
      <Stack display={{ xs: 'flex', md: 'none' }} alignItems="flex-start">
        <Button
          variant="outlined"
          startIcon={<Icon name="menu" />}
          onClick={() => setOpen(true)}
          data-testid={`sidebar-${color}-menu`}
        >
          {`Menu, ${color}`}
        </Button>
      </Stack>
      <Paper variant="outlined">
        <Stack direction="row">
          <Sidebar
            label={`Workspace, ${color}`}
            color={color}
            open={open}
            onOpenChange={setOpen}
            data-testid={`sidebar-${color}`}
          >
            <SidebarContent>
              {destinations.map(({ name, icon }) => (
                <SidebarItem
                  key={name}
                  icon={<Icon name={icon} />}
                  selected={name === 'Projects'}
                  data-testid={`sidebar-${color}-${name}`}
                >
                  {name}
                </SidebarItem>
              ))}
              <SidebarItem icon={<Icon name="lock" />} disabled>
                Archive
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </Stack>
      </Paper>
    </Stack>
  );
}

export function SidebarColorStory() {
  return (
    <Example title="The current item in each colour: neutral by default, primary and secondary">
      <Grid container columns={{ xs: 1, lg: 3 }} spacing="lg">
        {colors.map((color) => (
          <ColorSidebar key={color} color={color} />
        ))}
      </Grid>
    </Example>
  );
}

export const sidebarColorStory: Story = {
  id: 'sidebar-color',
  title: 'Sidebar colours',
  render: () => <SidebarColorStory />,
};
