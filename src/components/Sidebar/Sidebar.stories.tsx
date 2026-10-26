import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Icon, type IconName } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Collapse } from '../Collapse';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemButton } from '../ListItemButton';
import { ListItemIcon } from '../ListItemIcon';
import { ListItemText } from '../ListItemText';
import { ListSubheader } from '../ListSubheader';
import { Paper } from '../Paper';
import { SidebarContent } from '../SidebarContent';
import { SidebarFooter } from '../SidebarFooter';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarItem } from '../SidebarItem';
import { Sidebar } from './Sidebar';
import type { SidebarColor } from './Sidebar.types';

const destinations: readonly { name: string; icon: IconName; count?: string }[] = [
  { name: 'Overview', icon: 'dashboard' },
  { name: 'Projects', icon: 'folder' },
  { name: 'Members', icon: 'users', count: '8' },
  { name: 'Calendar', icon: 'calendar' },
];

const teamPages: readonly { name: string; icon: IconName }[] = [
  { name: 'Issues', icon: 'file' },
  { name: 'Views', icon: 'eye' },
];

const colors: readonly SidebarColor[] = ['neutral', 'primary', 'secondary'];

export function SidebarStory() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('Overview');
  const [team, setTeam] = useState(true);
  return (
    <Stack spacing="xl">
      <Example title="Docked from md, a drawer below md, an icon rail when collapsed, a count, a group label and a nested level">
        <Stack direction="row" spacing="sm">
          <Button
            variant="outlined"
            startAddon={<Icon name="sidebar" />}
            onClick={() => setCollapsed((value) => !value)}
            data-testid="sidebar-collapse"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
          <Stack display={{ xs: 'flex', md: 'none' }}>
            <Button
              variant="contained"
              startAddon={<Icon name="menu" />}
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
                {destinations.map(({ name, icon, count }) => (
                  <SidebarItem
                    key={name}
                    icon={<Icon name={icon} />}
                    end={count}
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
                {collapsed ? null : (
                  <>
                    <ListSubheader data-testid="sidebar-group-label">Your teams</ListSubheader>
                    <ListItem end={<Icon name={team ? 'chevron-up' : 'chevron-down'} />}>
                      <ListItemButton
                        onClick={() => setTeam((value) => !value)}
                        aria-expanded={team}
                        aria-controls="sidebar-team-engineering"
                        data-testid="sidebar-team-toggle"
                      >
                        <ListItemIcon>
                          <Icon name="users" />
                        </ListItemIcon>
                        <ListItemText primary="Engineering" noWrap />
                      </ListItemButton>
                      <Collapse in={team}>
                        <List nested id="sidebar-team-engineering" aria-label="Engineering">
                          {teamPages.map(({ name, icon }) => (
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
                        </List>
                      </Collapse>
                    </ListItem>
                  </>
                )}
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
          startAddon={<Icon name="menu" />}
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
