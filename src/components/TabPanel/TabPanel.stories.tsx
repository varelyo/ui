import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Typography } from '../../foundation/Typography';
import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { Tabs } from '../Tabs';
import { TabPanel } from './TabPanel';

export function TabPanelStory() {
  return (
    <Example title="Only the selected panel renders its content; the others stay hidden">
      <Tabs defaultValue="notes">
        <TabList aria-label="Details">
          <Tab value="notes" label="Notes" />
          <Tab value="history" label="History" />
        </TabList>
        <TabPanel value="notes">
          <Typography variant="body-md">Notes for the handoff.</Typography>
        </TabPanel>
        <TabPanel value="history">
          <Typography variant="body-md">Every version of this screen.</Typography>
        </TabPanel>
      </Tabs>
    </Example>
  );
}

export const tabPanelStory: Story = {
  id: 'tab-panel',
  title: 'TabPanel',
  render: () => <TabPanelStory />,
};
