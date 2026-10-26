import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { Modal } from './Modal';
import type { ModalCloseReason } from './Modal.types';

export function ModalStory() {
  const [open, setOpen] = useState(false);
  const [kept, setKept] = useState(false);
  const [reason, setReason] = useState<ModalCloseReason | 'none'>('none');
  return (
    <Stack spacing="xl">
      <Example title="The modal core traps focus and draws no surface of its own">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button variant="outlined" onClick={() => setOpen(true)} data-testid="modal-open">
            Open modal
          </Button>
          <Typography variant="body-sm" data-testid="modal-reason">
            {reason}
          </Typography>
        </Stack>
        <Modal
          open={open}
          onClose={(_, closeReason) => {
            setReason(closeReason);
            setOpen(false);
          }}
          aria-label="Core modal"
          className="flex items-center justify-center"
          data-testid="modal"
        >
          <Paper elevation="xl">
            <Stack p="xl" spacing="md">
              <Typography variant="title-md">Core modal</Typography>
              <Stack direction="row" spacing="sm">
                <Button variant="outlined" data-testid="modal-first">
                  First
                </Button>
                <Button variant="contained" onClick={() => setOpen(false)} data-testid="modal-done">
                  Done
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Modal>
      </Example>
      <Example title="A kept-mounted modal stays in the document while closed">
        <Stack direction="row">
          <Button variant="outlined" onClick={() => setKept(true)} data-testid="modal-kept-open">
            Open kept modal
          </Button>
        </Stack>
        <Modal
          open={kept}
          onClose={() => setKept(false)}
          keepMounted
          aria-label="Kept modal"
          className="flex items-center justify-center"
          data-testid="modal-kept"
        >
          <Paper elevation="xl">
            <Stack p="xl" spacing="md">
              <Typography variant="title-md">Kept modal</Typography>
              <Stack direction="row">
                <Button variant="contained" onClick={() => setKept(false)}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Modal>
      </Example>
    </Stack>
  );
}

export const modalStory: Story = {
  id: 'modal',
  title: 'Modal',
  render: () => <ModalStory />,
};
