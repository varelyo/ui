import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
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
