import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { ThemeScope } from '../../foundation/ThemeScope';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import type { PopperPlacement } from '../Popper';
import { Tooltip } from './Tooltip';

const placements: readonly PopperPlacement[] = ['top', 'right', 'bottom', 'left'];

export function TooltipStory() {
  const [events, setEvents] = useState<string[]>([]);
  const record = (name: string) => () => setEvents((list) => [...list, name]);
  return (
    <Stack spacing="xl">
      <Example title="Placements on hover and keyboard focus">
        <Stack direction="row" spacing="md">
          {placements.map((placement) => (
            <Tooltip key={placement} title={`Opens ${placement}`} placement={placement}>
              <Button variant="outlined" data-testid={`trigger-${placement}`}>
                {placement}
              </Button>
            </Tooltip>
          ))}
          <Tooltip
            title="Counted"
            onOpen={record('open')}
            onClose={record('close')}
            data-testid="counted-tooltip"
          >
            <Button variant="text" data-testid="trigger-counted">
              Counted
            </Button>
          </Tooltip>
          <Typography variant="body-sm" data-testid="tooltip-events">
            {events.join(' ')}
          </Typography>
        </Stack>
      </Example>
      <Example title="Open, with a long title that wraps at the tooltip width">
        <Stack direction="row" spacing="3xl" p={['2xl', 'none', 'lg', 'none']}>
          <Tooltip title="Saved to drafts" open data-testid="open-tooltip">
            <Button
              variant="contained"
              startIcon={<Icon name="check" />}
              data-testid="trigger-open"
            >
              Save
            </Button>
          </Tooltip>
          <Tooltip
            title="Publishing makes this page visible to everyone who has the link, including people outside your workspace"
            open
            placement="right"
            data-testid="long-tooltip"
          >
            <Button variant="outlined">Publish</Button>
          </Tooltip>
        </Stack>
      </Example>
      <Example title="Disabled controls and empty titles">
        <Stack direction="row" spacing="md">
          <Tooltip title="You need edit access" data-testid="disabled-tooltip">
            <span data-testid="trigger-disabled" tabIndex={0}>
              <Button disabled>Delete</Button>
            </span>
          </Tooltip>
          <Tooltip title="" data-testid="empty-tooltip">
            <Button variant="outlined" data-testid="trigger-empty">
              No tooltip
            </Button>
          </Tooltip>
        </Stack>
      </Example>
      <Example title="Inverts the mode of the scope it opens from">
        <ThemeScope mode="dark" data-testid="dark-scope">
          <Stack direction="row" p={['2xl', 'lg', 'lg', 'lg']}>
            <Tooltip title="Dark scope" open data-testid="dark-tooltip">
              <Button variant="outlined" data-testid="trigger-dark">
                Inside dark
              </Button>
            </Tooltip>
          </Stack>
        </ThemeScope>
      </Example>
    </Stack>
  );
}

export const tooltipStory: Story = {
  id: 'tooltip',
  title: 'Tooltip',
  render: () => <TooltipStory />,
};
