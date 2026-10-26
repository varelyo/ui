import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { DialogActions } from './DialogActions';

export function DialogActionsStory() {
  return (
    <Example title="Dialog actions align to the end with the action gap">
      <Stack direction="row">
        <Paper elevation="md">
          <DialogActions data-testid="dialog-actions-part">
            <Button variant="text">Cancel</Button>
            <Button variant="contained">Invite</Button>
          </DialogActions>
        </Paper>
      </Stack>
    </Example>
  );
}

export const dialogActionsStory: Story = {
  id: 'dialog-actions',
  title: 'DialogActions',
  render: () => <DialogActionsStory />,
};
