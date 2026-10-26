import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { FormControl } from '../FormControl';
import { InputAdornment } from './InputAdornment';

export function InputAdornmentStory() {
  return (
    <Stack spacing="xl">
      <Example title="Adornment icons take the field size">
        <Stack direction="row" spacing="lg" alignItems="center">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <FormControl key={size} size={size}>
              <InputAdornment position="start">
                <Icon name="search" />
              </InputAdornment>
            </FormControl>
          ))}
        </Stack>
      </Example>
    </Stack>
  );
}

export const inputAdornmentStory: Story = {
  id: 'input-adornment',
  title: 'InputAdornment',
  render: () => <InputAdornmentStory />,
};
