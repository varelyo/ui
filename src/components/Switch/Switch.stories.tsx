import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Switch } from './Switch';
import type { SwitchColor, SwitchSize } from './Switch.types';

const colors: readonly SwitchColor[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const sizes: readonly SwitchSize[] = ['sm', 'md', 'lg'];

export function SwitchStory() {
  const [wifi, setWifi] = useState(true);
  return (
    <Stack spacing="xl">
      <Example title="Colours on, sizes and disabled">
        <Stack direction="row" spacing="md" alignItems="center">
          {colors.map((color) => (
            <Switch key={color} color={color} defaultChecked aria-label={`${color} switch`} />
          ))}
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          {sizes.map((size) => (
            <Switch key={size} size={size} label={`Size ${size}`} data-testid={`switch-${size}`} />
          ))}
          <Switch label="Disabled" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
        </Stack>
      </Example>
      <Example title="Controlled">
        <Stack direction="row" spacing="md" alignItems="center">
          <Switch
            label="Wi-Fi"
            checked={wifi}
            onChange={(_, checked) => setWifi(checked)}
            data-testid="switch-wifi"
          />
          <Typography variant="body-sm" data-testid="switch-wifi-state">
            {wifi ? 'on' : 'off'}
          </Typography>
        </Stack>
      </Example>
    </Stack>
  );
}

export const switchStory: Story = {
  id: 'switch',
  title: 'Switch',
  render: () => <SwitchStory />,
};
