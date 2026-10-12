import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { icons } from '../../generated/icons';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Icon } from './Icon';
import type { IconName } from './Icon.types';

export function IconStory() {
  const names = Object.keys(icons) as IconName[];
  return (
    <Stack spacing="xl">
      <Example title={`Icon family · ${names.length} icons`}>
        <Grid container columns={{ xs: 3, sm: 5, md: 8, lg: 10 }} spacing="lg">
          {names.map((name) => (
            <Stack key={name} spacing="xs" alignItems="center">
              <Icon name={name} size="lg" />
              <Typography variant="label-sm" color="on-surface-variant-default" align="center">
                {name}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Example>
      <Example title="Sizes">
        <Stack direction="row" spacing="lg" alignItems="center">
          <Icon name="settings" size="xs" />
          <Icon name="settings" size="sm" />
          <Icon name="settings" size="md" />
          <Icon name="settings" size="lg" />
          <Icon name="settings" size="xl" />
          <Icon name="settings" size="2xl" />
          <Icon name="notification" size={{ xs: 'sm', md: 'xl' }} titleAccess="Notifications" />
        </Stack>
      </Example>
      <Example title="Colours">
        <Stack direction="row" spacing="lg" alignItems="center">
          <Icon name="check-circle" color="success-default" />
          <Icon name="warning" color="warning-default" />
          <Icon name="error" color="error-default" />
          <Icon name="information" color="info-default" />
        </Stack>
      </Example>
    </Stack>
  );
}

export const iconStory: Story = {
  id: 'icons',
  title: 'Icon family',
  render: () => <IconStory />,
};
