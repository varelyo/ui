import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { List } from '../List';
import { ListItemButton } from '../ListItemButton';
import { ListItemIcon } from '../ListItemIcon';
import { ListItemText } from '../ListItemText';
import { Paper } from '../Paper';
import { ListItem } from './ListItem';

export function ListItemStory() {
  return (
    <Example title="ListItem: a static row, a row with an end, a divider and a row holding a button">
      <Stack direction="row">
        <Paper variant="outlined">
          <List aria-label="Rows">
            <ListItem data-testid="list-item-static">
              <ListItemIcon>
                <Icon name="clock" />
              </ListItemIcon>
              <ListItemText primary="Opening hours" secondary="Weekdays from nine" />
            </ListItem>
            <ListItem end="24" divider data-testid="list-item-end">
              <ListItemText primary="Open tasks" />
            </ListItem>
            <ListItem end={<Icon name="chevron-right" />} data-testid="list-item-button-row">
              <ListItemButton>
                <ListItemText primary="Billing" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Example>
  );
}

export const listItemStory: Story = {
  id: 'list-item',
  title: 'ListItem',
  render: () => <ListItemStory />,
};
