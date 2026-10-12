import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { CardActions } from './CardActions';

export function CardActionsStory() {
  return (
    <Example title="CardActions with its card tokens">
      <Stack direction="row">
        <Paper variant="outlined">
          <CardActions data-testid="card-actions-part">
            <Typography variant="body-md">Card body text</Typography>
            <Button variant="text">Action</Button>
          </CardActions>
        </Paper>
      </Stack>
    </Example>
  );
}

export const cardActionsStory: Story = {
  id: 'card-actions',
  title: 'CardActions',
  render: () => <CardActionsStory />,
};
