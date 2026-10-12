import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { CardActions } from '../CardActions';
import { CardContent } from '../CardContent';
import { CardHeader } from '../CardHeader';
import { Card } from './Card';

export function CardStory() {
  return (
    <Stack spacing="xl">
      <Example title="Header, content and actions on an elevated and an outlined card">
        <Stack direction="row" spacing="lg" alignItems="flex-start">
          <Card data-testid="card" component="article" aria-labelledby="card-title">
            <CardHeader
              avatar={<Avatar alt="Mira Holt">MH</Avatar>}
              title={<span id="card-title">Design review</span>}
              subheader="Tomorrow, 10:00"
              action={
                <Button
                  variant="text"
                  aria-label="More options"
                  startIcon={<Icon name="more-horizontal" />}
                />
              }
              data-testid="card-header"
            />
            <CardContent data-testid="card-content">
              <Typography variant="body-md" color="on-surface-variant-default">
                Walk through the new onboarding screens with the team.
              </Typography>
            </CardContent>
            <CardActions data-testid="card-actions">
              <Button variant="text">Decline</Button>
              <Button variant="contained">Join</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" data-testid="card-outlined">
            <CardContent>
              <Typography variant="body-md">An outlined card without a header.</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Example>
    </Stack>
  );
}

export const cardStory: Story = {
  id: 'card',
  title: 'Card',
  render: () => <CardStory />,
};
