import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { TabList } from '../TabList';
import { Tabs } from '../Tabs';
import { Tab } from './Tab';

export function TabStory() {
  return (
    <Example title="Tabs: selected, with an icon, disabled and with a long label">
      <Tabs defaultValue="inbox">
        <TabList aria-label="Mail">
          <Tab value="inbox" label="Inbox" icon={<Icon name="mail" />} />
          <Tab value="starred" label="Starred" icon={<Icon name="star" />} />
          <Tab value="archive" label="Archive" disabled />
          <Tab value="notifications" label="Notifications from every project" />
        </TabList>
      </Tabs>
    </Example>
  );
}

export const tabStory: Story = {
  id: 'tab',
  title: 'Tab',
  render: () => <TabStory />,
};
