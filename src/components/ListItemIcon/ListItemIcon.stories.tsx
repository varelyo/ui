import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemText } from '../ListItemText';
import { Paper } from '../Paper';
import { ListItemIcon } from './ListItemIcon';

export function ListItemIconStory() {
  return (
    <Example title="ListItemIcon: the size of its list, and a size of its own">
      <Stack direction="row">
        <Paper variant="outlined">
          <List aria-label="Icons">
            <ListItem>
              <ListItemIcon data-testid="list-item-icon-default">
                <Icon name="star" />
              </ListItemIcon>
              <ListItemText primary="From the list size" />
            </ListItem>
            <ListItem>
              <ListItemIcon size="lg" data-testid="list-item-icon-large">
                <Icon name="star" />
              </ListItemIcon>
              <ListItemText primary="A size of its own" />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Example>
  );
}

export const listItemIconStory: Story = {
  id: 'list-item-icon',
  title: 'ListItemIcon',
  render: () => <ListItemIconStory />,
};
