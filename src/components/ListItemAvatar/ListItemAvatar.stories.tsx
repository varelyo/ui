import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Avatar } from '../Avatar';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemText } from '../ListItemText';
import { Paper } from '../Paper';
import { ListItemAvatar } from './ListItemAvatar';

export function ListItemAvatarStory() {
  return (
    <Example title="ListItemAvatar: an avatar slot as wide as the avatar of its size">
      <Stack direction="row">
        <Paper variant="outlined">
          <List aria-label="People">
            <ListItem>
              <ListItemAvatar data-testid="list-item-avatar">
                <Avatar size="sm">AK</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ada Kerr" secondary="Engineering" />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Example>
  );
}

export const listItemAvatarStory: Story = {
  id: 'list-item-avatar',
  title: 'ListItemAvatar',
  render: () => <ListItemAvatarStory />,
};
