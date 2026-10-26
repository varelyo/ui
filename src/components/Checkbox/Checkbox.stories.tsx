import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Checkbox } from './Checkbox';
import type { CheckboxColor, CheckboxSize } from './Checkbox.types';

const colors: readonly CheckboxColor[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const sizes: readonly CheckboxSize[] = ['sm', 'md', 'lg'];

export function CheckboxStory() {
  const [terms, setTerms] = useState(false);
  const [parts, setParts] = useState([true, false]);
  const all = parts.every(Boolean);
  const some = parts.some(Boolean) && !all;
  return (
    <Stack spacing="xl">
      <Example title="Colours checked, sizes and disabled">
        <Stack direction="row" spacing="md" alignItems="center">
          {colors.map((color) => (
            <Checkbox key={color} color={color} defaultChecked aria-label={`${color} option`} />
          ))}
        </Stack>
        <Stack direction="row" spacing="md" alignItems="center">
          {sizes.map((size) => (
            <Checkbox
              key={size}
              size={size}
              label={`Size ${size}`}
              defaultChecked={size === 'md'}
            />
          ))}
          <Checkbox label="Disabled" disabled data-testid="checkbox-disabled" />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Stack>
      </Example>
      <Example title="Controlled, with an indeterminate parent">
        <Stack spacing="xs">
          <Checkbox
            label="All notifications"
            checked={all}
            indeterminate={some}
            onChange={(_, checked) => setParts([checked, checked])}
            data-testid="checkbox-parent"
          />
          <Stack p={['none', 'none', 'none', 'lg']} spacing="xs">
            {['Email', 'Push'].map((name, index) => (
              <Checkbox
                key={name}
                label={name}
                checked={parts[index] ?? false}
                onChange={(_, checked) =>
                  setParts((list) =>
                    list.map((value, position) => (position === index ? checked : value)),
                  )
                }
                data-testid={`checkbox-${name}`}
              />
            ))}
          </Stack>
        </Stack>
      </Example>
      <Example title="Uncontrolled in a form">
        <form data-testid="checkbox-form">
          <Stack direction="row" spacing="md" alignItems="center">
            <Checkbox
              name="terms"
              value="accepted"
              required
              label="I accept the terms"
              onChange={(_, checked) => setTerms(checked)}
              data-testid="checkbox-terms"
            />
            <Typography variant="body-sm" data-testid="checkbox-terms-state">
              {terms ? 'accepted' : 'pending'}
            </Typography>
          </Stack>
        </form>
      </Example>
    </Stack>
  );
}

export const checkboxStory: Story = {
  id: 'checkbox',
  title: 'Checkbox',
  render: () => <CheckboxStory />,
};
