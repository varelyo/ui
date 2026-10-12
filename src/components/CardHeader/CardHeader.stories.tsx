import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Paper } from '../Paper';
import { CardHeader } from './CardHeader';

export function CardHeaderStory() {
  return (
    <Example title="A card header with title and subheader">
      <Stack direction="row">
        <Paper variant="outlined">
          <CardHeader
            title="Quarterly report"
            subheader="Updated today"
            data-testid="card-header-part"
          />
        </Paper>
      </Stack>
    </Example>
  );
}

export const cardHeaderStory: Story = {
  id: 'card-header',
  title: 'CardHeader',
  render: () => <CardHeaderStory />,
};
