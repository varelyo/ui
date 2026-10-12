import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { usePopper } from './hooks';
import { Popper } from './Popper';

export function PopperStory() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const popper = usePopper({ open, anchorEl: anchor, placement: 'bottom-start', offset: 'sm' });
  return (
    <Stack spacing="xl">
      <Example title="Anchored content with no surface of its own">
        <Stack direction="row">
          <Button
            ref={setAnchor}
            variant="outlined"
            onClick={() => setOpen((value) => !value)}
            data-testid="popper-anchor"
          >
            {open ? 'Close' : 'Open'}
          </Button>
        </Stack>
        <Popper popper={popper} data-testid="popper">
          <Typography variant="body-md">Positioned under the anchor</Typography>
        </Popper>
      </Example>
    </Stack>
  );
}

export const popperStory: Story = {
  id: 'popper',
  title: 'Popper',
  render: () => <PopperStory />,
};
