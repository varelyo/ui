import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Divider } from '../Divider';
import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { Tabs } from './Tabs';
import type { TabsColor, TabValue } from './Tabs.types';

const colors: readonly TabsColor[] = ['neutral', 'primary', 'secondary'];

export function TabsStory() {
  const [value, setValue] = useState<TabValue>('overview');
  const [change, setChange] = useState('none');
  return (
    <Stack spacing="xl">
      <Example title="Manual activation: arrows move focus, Enter or Space selects">
        <Tabs
          value={value}
          onChange={(event, next) => {
            setValue(next);
            setChange(`${event.type}:${next}`);
          }}
          data-testid="tabs"
        >
          <TabList aria-label="Project sections">
            <Tab value="overview" label="Overview" icon={<Icon name="dashboard" />} />
            <Tab value="activity" label="Activity" icon={<Icon name="clock" />} />
            <Tab value="members" label="Members" icon={<Icon name="users" />} disabled />
            <Tab value="settings" label="Settings" icon={<Icon name="settings" />} />
          </TabList>
          <Divider />
          <TabPanel value="overview">
            <Typography variant="body-md">Recent screens and open reviews.</Typography>
          </TabPanel>
          <TabPanel value="activity">
            <Typography variant="body-md">Everything that changed this week.</Typography>
          </TabPanel>
          <TabPanel value="members">
            <Typography variant="body-md">People with access to the project.</Typography>
          </TabPanel>
          <TabPanel value="settings">
            <Typography variant="body-md">Name, visibility and integrations.</Typography>
          </TabPanel>
        </Tabs>
        <Typography variant="body-sm" data-testid="tabs-change">
          {change}
        </Typography>
      </Example>
      <Example title="Selection follows focus">
        <Tabs defaultValue="day" selectionFollowsFocus data-testid="tabs-range">
          <TabList aria-label="Range">
            <Tab value="day" label="Day" />
            <Tab value="week" label="Week" />
            <Tab value="month" label="Month" />
          </TabList>
          <TabPanel value="day">
            <Typography variant="body-md">Today, hour by hour.</Typography>
          </TabPanel>
          <TabPanel value="week">
            <Typography variant="body-md">The last seven days.</Typography>
          </TabPanel>
          <TabPanel value="month">
            <Typography variant="body-md">This month at a glance.</Typography>
          </TabPanel>
        </Tabs>
      </Example>
      <Example title="Vertical orientation">
        <Tabs defaultValue="profile" orientation="vertical" data-testid="tabs-vertical">
          <TabList aria-label="Account">
            <Tab value="profile" label="Profile" icon={<Icon name="user" />} />
            <Tab value="security" label="Security" icon={<Icon name="lock" />} />
            <Tab value="billing" label="Billing" icon={<Icon name="payment-card" />} />
          </TabList>
          <Divider orientation="vertical" flexItem />
          <TabPanel value="profile">
            <Typography variant="body-md">Your name, photo and contact details.</Typography>
          </TabPanel>
          <TabPanel value="security">
            <Typography variant="body-md">Passwords, sessions and two-step sign-in.</Typography>
          </TabPanel>
          <TabPanel value="billing">
            <Typography variant="body-md">Plan, payment method and invoices.</Typography>
          </TabPanel>
        </Tabs>
      </Example>
    </Stack>
  );
}

export const tabsStory: Story = {
  id: 'tabs',
  title: 'Tabs',
  render: () => <TabsStory />,
};

export function TabsColorStory() {
  return (
    <Stack spacing="xl">
      <Example title="The selected tab in each colour: neutral by default, primary and secondary">
        <Grid container columns={{ xs: 1, lg: 3 }} spacing="lg">
          {colors.map((color) => (
            <Tabs key={color} defaultValue="general" color={color} data-testid={`tabs-${color}`}>
              <TabList aria-label={`Settings, ${color}`}>
                <Tab value="general" label="General" icon={<Icon name="settings" />} />
                <Tab value="members" label="Members" icon={<Icon name="users" />} />
                <Tab value="billing" label="Billing" disabled />
              </TabList>
              <Divider />
            </Tabs>
          ))}
        </Grid>
      </Example>
      <Example title="Vertical tabs in each colour">
        <Grid container columns={{ xs: 1, lg: 3 }} spacing="lg">
          {colors.map((color) => (
            <Tabs
              key={color}
              defaultValue="security"
              orientation="vertical"
              color={color}
              data-testid={`tabs-vertical-${color}`}
            >
              <TabList aria-label={`Account, ${color}`}>
                <Tab value="profile" label="Profile" />
                <Tab value="security" label="Security" />
                <Tab value="sessions" label="Sessions" />
              </TabList>
              <Divider orientation="vertical" flexItem />
            </Tabs>
          ))}
        </Grid>
      </Example>
    </Stack>
  );
}

export const tabsColorStory: Story = {
  id: 'tabs-color',
  title: 'Tabs colours',
  render: () => <TabsColorStory />,
};

export function TabsSegmentedStory() {
  const [view, setView] = useState<TabValue>('board');
  return (
    <Stack spacing="xl">
      <Example title="Segmented: a filled track, options and a raised selected option">
        <Tabs
          variant="segmented"
          value={view}
          onChange={(_, next) => setView(next)}
          data-testid="tabs-segmented"
        >
          <TabList aria-label="View">
            <Tab value="board" label="Board" icon={<Icon name="dashboard" />} />
            <Tab value="list" label="List" icon={<Icon name="menu" />} />
            <Tab value="calendar" label="Calendar" icon={<Icon name="calendar" />} />
            <Tab value="archive" label="Archive" disabled />
          </TabList>
          <TabPanel value="board" data-testid="tabs-segmented-panel">
            <Typography variant="body-md">Cards grouped by status.</Typography>
          </TabPanel>
          <TabPanel value="list">
            <Typography variant="body-md">Every card in one list.</Typography>
          </TabPanel>
          <TabPanel value="calendar">
            <Typography variant="body-md">Cards on their due dates.</Typography>
          </TabPanel>
          <TabPanel value="archive">
            <Typography variant="body-md">Closed cards.</Typography>
          </TabPanel>
        </Tabs>
      </Example>
      <Example title="As wide as its options inside a Stack that does not stretch">
        <Stack alignItems="flex-start">
          <Tabs variant="segmented" defaultValue="monthly" data-testid="tabs-segmented-compact">
            <TabList aria-label="Billing period">
              <Tab value="monthly" label="Monthly" />
              <Tab value="yearly" label="Yearly" />
            </TabList>
          </Tabs>
        </Stack>
      </Example>
      <Example title="The selected option in each colour">
        <Grid container columns={{ xs: 1, lg: 3 }} spacing="lg">
          {colors.map((color) => (
            <Tabs
              key={color}
              variant="segmented"
              defaultValue="day"
              color={color}
              data-testid={`tabs-segmented-${color}`}
            >
              <TabList aria-label={`Range, ${color}`}>
                <Tab value="day" label="Day" />
                <Tab value="week" label="Week" />
                <Tab value="month" label="Month" />
              </TabList>
            </Tabs>
          ))}
        </Grid>
      </Example>
      <Example title="Rest, hover, pressed, keyboard focus, selected and disabled">
        <Tabs variant="segmented" defaultValue="selected" data-testid="tabs-segmented-states">
          <TabList aria-label="States">
            <Tab value="rest" label="Rest" />
            <Tab value="hover" label="Hover" data-state="hover" />
            <Tab value="pressed" label="Pressed" data-state="pressed" />
            <Tab value="focus" label="Focus" data-state="focus" />
            <Tab value="selected" label="Selected" />
            <Tab value="disabled" label="Disabled" disabled />
          </TabList>
        </Tabs>
      </Example>
      <Example title="Vertical">
        <Tabs
          variant="segmented"
          orientation="vertical"
          defaultValue="profile"
          data-testid="tabs-segmented-vertical"
        >
          <TabList aria-label="Account">
            <Tab value="profile" label="Profile" icon={<Icon name="user" />} />
            <Tab value="security" label="Security" icon={<Icon name="lock" />} />
            <Tab value="billing" label="Billing" icon={<Icon name="payment-card" />} />
          </TabList>
          <TabPanel value="profile">
            <Typography variant="body-md">Your name, photo and contact details.</Typography>
          </TabPanel>
          <TabPanel value="security">
            <Typography variant="body-md">Passwords, sessions and two-step sign-in.</Typography>
          </TabPanel>
          <TabPanel value="billing">
            <Typography variant="body-md">Plan, payment method and invoices.</Typography>
          </TabPanel>
        </Tabs>
      </Example>
    </Stack>
  );
}

export const tabsSegmentedStory: Story = {
  id: 'tabs-segmented',
  title: 'Tabs segmented',
  render: () => <TabsSegmentedStory />,
};
