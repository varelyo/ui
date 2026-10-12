import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Button } from '../Button';
import { CircularProgress } from '../CircularProgress';
import { Backdrop } from './Backdrop';

export function BackdropStory() {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing="xl">
      <Example title="A scrim over the page, closed by its own click handler">
        <Stack direction="row">
          <Button variant="outlined" onClick={() => setOpen(true)} data-testid="backdrop-open">
            Show backdrop
          </Button>
        </Stack>
        <Backdrop open={open} onClick={() => setOpen(false)} data-testid="backdrop">
          <CircularProgress color="inherit" aria-label="Loading" />
        </Backdrop>
      </Example>
    </Stack>
  );
}

export const backdropStory: Story = {
  id: 'backdrop',
  title: 'Backdrop',
  render: () => <BackdropStory />,
};
