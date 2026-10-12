import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Paper } from '../Paper';
import { DialogContent } from './DialogContent';

export function DialogContentStory() {
  return (
    <Example title="Dialog content with its inset and text tokens">
      <Stack direction="row">
        <Paper elevation="md">
          <DialogContent data-testid="dialog-content-part">
            <Typography variant="body-md">
              Everyone with the link can view this project until you turn sharing off.
            </Typography>
          </DialogContent>
        </Paper>
      </Stack>
    </Example>
  );
}

export const dialogContentStory: Story = {
  id: 'dialog-content',
  title: 'DialogContent',
  render: () => <DialogContentStory />,
};
