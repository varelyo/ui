import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { CardContent } from './CardContent';

export function CardContentStory() {
  return (
    <Example title="CardContent with its card tokens">
      <Stack direction="row">
        <Paper variant="outlined">
          <CardContent data-testid="card-content-part">
            <Typography variant="body-md">Card body text</Typography>
            <Button variant="text">Action</Button>
          </CardContent>
        </Paper>
      </Stack>
    </Example>
  );
}

export const cardContentStory: Story = {
  id: 'card-content',
  title: 'CardContent',
  render: () => <CardContentStory />,
};
