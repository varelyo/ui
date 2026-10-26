import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { Paper } from '../Paper';
import { ListItemText } from './ListItemText';

export function ListItemTextStory() {
  return (
    <Example title="ListItemText: children, primary and secondary, inset, no wrap and text styles of the kit">
      <Stack direction="row">
        <Paper variant="outlined">
          <List aria-label="Text">
            <ListItem>
              <ListItemText data-testid="list-item-text-children">From children</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary="Primary" secondary="Secondary" />
            </ListItem>
            <ListItem>
              <ListItemText inset primary="Inset" />
            </ListItem>
            <ListItem>
              <ListItemText
                noWrap
                primary="A long primary line that stays on one line and ends with an ellipsis"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Title text style"
                secondary="Label text style"
                primaryVariant="title-sm"
                secondaryVariant="label-sm"
                data-testid="list-item-text-variants"
              />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Example>
  );
}

export const listItemTextStory: Story = {
  id: 'list-item-text',
  title: 'ListItemText',
  render: () => <ListItemTextStory />,
};
