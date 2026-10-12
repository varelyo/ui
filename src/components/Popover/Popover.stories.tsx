import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Popover } from './Popover';
import type { PopoverCloseReason } from './Popover.types';

export function PopoverStory() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [aboutAnchor, setAboutAnchor] = useState<HTMLButtonElement | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [reason, setReason] = useState<PopoverCloseReason | 'apply' | 'none'>('none');
  return (
    <Stack spacing="xl">
      <Example title="A panel moves focus inside, closes on Escape, outside press or Tab and restores focus">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button
            variant="outlined"
            aria-haspopup="dialog"
            aria-expanded={anchor ? 'true' : 'false'}
            aria-controls={anchor ? 'filters-popover' : undefined}
            onClick={(event) => setAnchor(anchor ? null : event.currentTarget)}
            data-testid="popover-open"
          >
            Filters
          </Button>
          <Popover
            id="filters-popover"
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={(_, closeReason) => {
              setReason(closeReason);
              setAnchor(null);
            }}
            aria-labelledby="filters-title"
            data-testid="popover"
          >
            <Stack spacing="md" p="lg">
              <Typography variant="title-sm" id="filters-title">
                Filter projects
              </Typography>
              <TextField label="Owner" size="sm" />
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="sm"
                  onClick={() => {
                    setReason('apply');
                    setAnchor(null);
                  }}
                  data-testid="popover-apply"
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
          </Popover>
          <Button variant="text" data-testid="popover-after">
            Export
          </Button>
          <Typography variant="body-sm" data-testid="popover-reason">
            {reason}
          </Typography>
        </Stack>
      </Example>
      <Example title="Long content wraps at the reading measure; the panel stays mounted while closed">
        <Stack direction="row">
          <Button
            ref={setAboutAnchor}
            variant="text"
            onClick={() => setAboutOpen((value) => !value)}
            data-testid="popover-about-open"
          >
            About sharing
          </Button>
        </Stack>
        <Popover
          open={aboutOpen}
          anchorEl={aboutAnchor}
          onClose={() => setAboutOpen(false)}
          keepMounted
          aria-label="About sharing"
          data-testid="popover-about"
        >
          <Stack p="lg" spacing="md">
            <Typography variant="body-md">
              Sharing a project gives everyone with the link the access you choose. Editors can
              change screens and components, reviewers can leave comments, and viewers can only
              read. You can revoke a link at any time from the project settings, and every change
              stays in the project history.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="text" size="sm" data-testid="popover-about-settings">
                Project settings
              </Button>
            </Stack>
          </Stack>
        </Popover>
      </Example>
    </Stack>
  );
}

export const popoverStory: Story = {
  id: 'popover',
  title: 'Popover',
  render: () => <PopoverStory />,
};
