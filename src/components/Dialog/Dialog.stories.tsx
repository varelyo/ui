import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { DialogActions } from '../DialogActions';
import { DialogContent } from '../DialogContent';
import { DialogTitle } from '../DialogTitle';
import type { ModalCloseReason } from '../Modal';
import { TextField } from '../TextField';
import { Tooltip } from '../Tooltip';
import { Dialog } from './Dialog';

const paragraphs = Array.from({ length: 14 }, (_, index) => index + 1);

export function DialogStory() {
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  const [labelled, setLabelled] = useState(false);
  const [reason, setReason] = useState<ModalCloseReason | 'confirm' | 'none'>('none');
  return (
    <Stack spacing="xl">
      <Example title="Dialogs trap focus, close on Escape or the backdrop and restore focus">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button variant="contained" onClick={() => setOpen(true)} data-testid="dialog-open">
            Delete project
          </Button>
          <Button variant="outlined" onClick={() => setLong(true)} data-testid="dialog-long-open">
            Terms
          </Button>
          <Button variant="text" onClick={() => setLabelled(true)} data-testid="dialog-label-open">
            Rename
          </Button>
          <Typography variant="body-sm" data-testid="dialog-reason">
            {reason}
          </Typography>
        </Stack>
      </Example>
      <Dialog
        open={open}
        onClose={(_, closeReason) => {
          setReason(closeReason);
          setOpen(false);
        }}
        aria-describedby="delete-description"
        data-testid="dialog"
      >
        <DialogTitle>Delete this project?</DialogTitle>
        <DialogContent>
          <Typography variant="body-md" id="delete-description">
            The project and its files are removed for everyone. This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Keeps the project">
            <Button variant="text" onClick={() => setOpen(false)} data-testid="dialog-cancel">
              Cancel
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setReason('confirm');
              setOpen(false);
            }}
            data-testid="dialog-confirm"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={long}
        onClose={() => setLong(false)}
        maxWidth="md"
        fullWidth
        data-testid="dialog-long"
      >
        <DialogTitle>Terms of service</DialogTitle>
        <DialogContent data-testid="dialog-long-content">
          <Stack spacing="md">
            {paragraphs.map((paragraph) => (
              <Typography key={paragraph} variant="body-md">
                {`Section ${paragraph}. The service is provided as is, and every workspace keeps its own data. Owners decide who may read, edit or share each project.`}
              </Typography>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setLong(false)}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={labelled}
        onClose={() => setLabelled(false)}
        aria-label="Rename project"
        data-testid="dialog-labelled"
      >
        <DialogContent>
          <Stack spacing="md" p={['lg', 'none', 'none', 'none']}>
            <TextField label="Project name" defaultValue="Harbor" fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setLabelled(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export const dialogStory: Story = {
  id: 'dialog',
  title: 'Dialog',
  render: () => <DialogStory />,
};
