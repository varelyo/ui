import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { icons, type IconElement } from '../../generated/icons';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Icon } from './Icon';
import { ICON_VIEW_BOX } from './Icon.constants';
import { iconClassName } from './Icon.styles';
import type { IconName } from './Icon.types';
import { IconShape } from './ui';

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

const filledArtwork: readonly (readonly IconElement[])[] = [
  [{ circle: [12, 12, 8.4] }, { circle: [12, 12, 3.6], fill: 'currentColor' }],
  [{ ellipse: [12, 12, 7.2, 4.8], fill: 'currentColor' }],
  [{ path: 'M9 6H15Q18 6 18 9V15Q18 18 15 18H9Q6 18 6 15V9Q6 6 9 6Z', fill: 'currentColor' }],
];

export function IconFillStory() {
  return (
    <Example title="Filled shapes take the icon's colour and keep its stroke">
      <Stack direction="row" spacing="lg" alignItems="center">
        {filledArtwork.map((elements, index) => (
          <svg
            key={index}
            viewBox={ICON_VIEW_BOX}
            aria-hidden
            focusable="false"
            data-testid={`icon-fill-${index}`}
            className={iconClassName({
              size: 'xl',
              color: index === 0 ? 'error-default' : undefined,
            })}
          >
            {elements.map((element, position) => (
              <IconShape key={position} element={element} />
            ))}
          </svg>
        ))}
      </Stack>
    </Example>
  );
}

export const iconFillStory: Story = {
  id: 'icon-fill',
  title: 'Icon fill',
  render: () => <IconFillStory />,
};
