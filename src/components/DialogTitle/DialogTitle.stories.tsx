import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Paper } from '../Paper';
import { DialogTitle } from './DialogTitle';

export function DialogTitleStory() {
  return (
    <Example title="A dialog title on its own surface">
      <Stack direction="row">
        <Paper elevation="md">
          <DialogTitle data-testid="dialog-title-part">Invite teammates</DialogTitle>
          <DialogTitle component="h3">A title rendered as h3</DialogTitle>
        </Paper>
      </Stack>
    </Example>
  );
}

export const dialogTitleStory: Story = {
  id: 'dialog-title',
  title: 'DialogTitle',
  render: () => <DialogTitleStory />,
};
