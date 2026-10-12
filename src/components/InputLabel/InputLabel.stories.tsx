import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { FormControl } from '../FormControl';
import { InputBase } from '../InputBase';
import { InputLabel } from './InputLabel';

export function InputLabelStory() {
  return (
    <Stack spacing="xl">
      <Example title="Label of an optional and a required field">
        <Stack direction="row" spacing="lg">
          <FormControl>
            <InputLabel htmlFor="label-optional">Optional</InputLabel>
            <InputBase id="label-optional" />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor="label-required">Required</InputLabel>
            <InputBase id="label-required" />
          </FormControl>
        </Stack>
      </Example>
    </Stack>
  );
}

export const inputLabelStory: Story = {
  id: 'input-label',
  title: 'InputLabel',
  render: () => <InputLabelStory />,
};
