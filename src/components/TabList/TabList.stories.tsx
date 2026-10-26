import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Typography } from '../Typography';
import { Tab } from '../Tab';
import { TabPanel } from '../TabPanel';
import { Tabs } from '../Tabs';
import { TabList } from './TabList';

export function TabListStory() {
  return (
    <Example title="A tab list is one tab stop; the selected tab takes focus when entering it">
      <Tabs defaultValue="week">
        <TabList aria-label="Report period">
          <Tab value="day" label="Day" />
          <Tab value="week" label="Week" />
          <Tab value="quarter" label="Quarter" />
          <Tab value="year" label="Year" />
        </TabList>
        <TabPanel value="week">
          <Typography variant="body-md">Week report.</Typography>
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export const tabListStory: Story = {
  id: 'tab-list',
  title: 'TabList',
  render: () => <TabListStory />,
};
