import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
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
                  startAddon={<Icon name="more-horizontal" />}
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

const plans = [
  { id: 'starter', name: 'Starter', price: '$0', detail: 'For one person trying things out.' },
  { id: 'team', name: 'Team', price: '$12', detail: 'For teams that share projects.' },
  { id: 'business', name: 'Business', price: '$24', detail: 'For companies with many teams.' },
] as const;

export function CardSelectedStory() {
  const [plan, setPlan] = useState<(typeof plans)[number]['id']>('team');
  return (
    <Stack spacing="xl">
      <Example title="A featured plan set apart, and the chosen option following the page's state">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {plans.map(({ id, name, price, detail }) => (
            <Grid key={id} size={1}>
              <Card
                variant="outlined"
                selected={plan === id}
                component="article"
                aria-labelledby={`plan-${id}`}
                data-testid={`card-plan-${id}`}
              >
                <CardHeader title={<span id={`plan-${id}`}>{name}</span>} subheader={detail} />
                <CardContent>
                  <Typography variant="headline-md" color="on-surface-default">
                    {price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant={plan === id ? 'contained' : 'outlined'}
                    aria-pressed={plan === id}
                    onClick={() => setPlan(id)}
                    data-testid={`card-plan-${id}-choose`}
                  >
                    {plan === id ? 'Chosen' : 'Choose'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="A selected elevated card">
        <Stack direction="row" spacing="lg" alignItems="flex-start">
          <Card selected data-testid="card-elevation-selected">
            <CardContent>
              <Typography variant="body-md">Selected, elevated</Typography>
            </CardContent>
          </Card>
          <Card data-testid="card-elevation">
            <CardContent>
              <Typography variant="body-md">Resting, elevated</Typography>
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

export const cardSelectedStory: Story = {
  id: 'card-selected',
  title: 'Card selected',
  render: () => <CardSelectedStory />,
};
