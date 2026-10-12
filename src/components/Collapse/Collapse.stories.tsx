import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Container } from '../../foundation/Container';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { Collapse } from './Collapse';

export function CollapseStory() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [wide, setWide] = useState(true);
  return (
    <Stack spacing="xl">
      <Example title="Vertical, unmounted after it closes">
        <Stack direction="row">
          <Button
            variant="outlined"
            onClick={() => setOpen((value) => !value)}
            data-testid="collapse-toggle"
          >
            {open ? 'Hide details' : 'Show details'}
          </Button>
        </Stack>
        <Collapse in={open} unmountOnExit data-testid="collapse">
          <Paper variant="outlined">
            <Stack p="lg" spacing="sm">
              <Typography variant="body-md">Billing contact: finance@example.com</Typography>
              <Button variant="text" data-testid="collapse-inner">
                Edit contact
              </Button>
            </Stack>
          </Paper>
        </Collapse>
      </Example>
      <Example title="A collapsed size keeps a preview visible">
        <Stack direction="row">
          <Button
            variant="outlined"
            onClick={() => setPreview((value) => !value)}
            data-testid="collapse-preview-toggle"
          >
            {preview ? 'Less' : 'More'}
          </Button>
        </Stack>
        <Container maxWidth="xs" disableGutters>
          <Collapse in={preview} collapsedSize="3xl" data-testid="collapse-preview">
            <Typography variant="body-md">
              The first lines of a long note stay readable while the rest waits behind the toggle.
              Collapsed content keeps its place in the reading order, and the height animates with
              the motion tokens. Reduced motion switches the change to an instant one.
            </Typography>
          </Collapse>
        </Container>
      </Example>
      <Example title="Horizontal">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button
            variant="outlined"
            onClick={() => setWide((value) => !value)}
            data-testid="collapse-horizontal-toggle"
          >
            Toggle
          </Button>
          <Collapse in={wide} orientation="horizontal" data-testid="collapse-horizontal">
            <Typography variant="body-md" noWrap>
              Side content
            </Typography>
          </Collapse>
        </Stack>
      </Example>
    </Stack>
  );
}

export const collapseStory: Story = {
  id: 'collapse',
  title: 'Collapse',
  render: () => <CollapseStory />,
};
