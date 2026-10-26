import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { List } from '../List';
import { Paper } from '../Paper';
import { ListSubheader } from './ListSubheader';

export function ListSubheaderStory() {
  return (
    <Example title="ListSubheader: neutral, primary, secondary, inset, sticky and without gutters">
      <Stack direction="row">
        <Paper variant="outlined">
          <List aria-label="Group labels">
            <ListSubheader data-testid="list-subheader-neutral">Your teams</ListSubheader>
            <ListSubheader color="primary">Favourites</ListSubheader>
            <ListSubheader color="secondary">Shared with you</ListSubheader>
            <ListSubheader inset>Aligned with icon rows</ListSubheader>
            <ListSubheader sticky>Sticky</ListSubheader>
            <ListSubheader disableGutters>Without gutters</ListSubheader>
          </List>
        </Paper>
      </Stack>
    </Example>
  );
}

export const listSubheaderStory: Story = {
  id: 'list-subheader',
  title: 'ListSubheader',
  render: () => <ListSubheaderStory />,
};
