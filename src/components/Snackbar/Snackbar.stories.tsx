import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { Snackbar } from './Snackbar';

export function SnackbarStory() {
  const [archived, setArchived] = useState(false);
  const [reason, setReason] = useState('none');
  const [top, setTop] = useState(false);
  const [right, setRight] = useState(false);
  const [alert, setAlert] = useState(false);
  const [custom, setCustom] = useState(false);
  return (
    <Stack spacing="xl">
      <Example title="Hides after a short dwell, pauses on hover, focus and a hidden page, and reports why">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button variant="contained" onClick={() => setArchived(true)} data-testid="snackbar-open">
            Archive project
          </Button>
          <Typography variant="body-sm" data-testid="snackbar-reason">
            {reason}
          </Typography>
        </Stack>
        <Snackbar
          open={archived}
          autoHideDuration="short"
          onClose={(_, closeReason) => {
            setReason(closeReason);
            setArchived(false);
          }}
          message="Project archived"
          action={
            <Button
              variant="text"
              color="primary"
              size="sm"
              onClick={() => {
                setReason('undo');
                setArchived(false);
              }}
              data-testid="snackbar-undo"
            >
              Undo
            </Button>
          }
          data-testid="snackbar"
        />
      </Example>
      <Example title="Anchored to the top center or the bottom right; Escape closes the newest first">
        <Stack direction="row" spacing="md">
          <Button variant="outlined" onClick={() => setTop(true)} data-testid="snackbar-top-open">
            Top center
          </Button>
          <Button
            variant="outlined"
            onClick={() => setRight(true)}
            data-testid="snackbar-right-open"
          >
            Bottom right
          </Button>
        </Stack>
        <Snackbar
          open={top}
          onClose={() => setTop(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message="Changes saved"
          data-testid="snackbar-top"
        />
        <Snackbar
          open={right}
          onClose={() => setRight(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          message="Link copied to the clipboard"
          data-testid="snackbar-right"
        />
      </Example>
      <Example title="An explicit alert role, and custom content without the default surface">
        <Stack direction="row" spacing="md">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setAlert(true)}
            data-testid="snackbar-alert-open"
          >
            Lose connection
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCustom(true)}
            data-testid="snackbar-custom-open"
          >
            Custom content
          </Button>
        </Stack>
        <Snackbar
          open={alert}
          role="alert"
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message="Connection lost. Changes are kept on this device until it returns."
          action={
            <Button variant="text" color="primary" size="sm" onClick={() => setAlert(false)}>
              Dismiss
            </Button>
          }
          data-testid="snackbar-alert"
        />
        <Snackbar
          open={custom}
          onClose={() => setCustom(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          data-testid="snackbar-custom"
        >
          <Paper variant="outlined">
            <Stack direction="row" spacing="md" p="md" alignItems="center">
              <Typography variant="body-md">Export finished</Typography>
              <Button size="sm" onClick={() => setCustom(false)}>
                Open
              </Button>
            </Stack>
          </Paper>
        </Snackbar>
      </Example>
    </Stack>
  );
}

export const snackbarStory: Story = {
  id: 'snackbar',
  title: 'Snackbar',
  render: () => <SnackbarStory />,
};
