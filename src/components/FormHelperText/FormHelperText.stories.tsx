import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { FormControl } from '../FormControl';
import { FormHelperText } from './FormHelperText';

export function FormHelperTextStory() {
  return (
    <Stack spacing="xl">
      <Example title="Helper text in the normal, error and disabled states">
        <Stack spacing="sm">
          <FormControl>
            <FormHelperText>Shown on the dashboard</FormHelperText>
          </FormControl>
          <FormControl error>
            <FormHelperText>Must be positive</FormHelperText>
          </FormControl>
          <FormControl disabled>
            <FormHelperText>Locked by policy</FormHelperText>
          </FormControl>
        </Stack>
      </Example>
    </Stack>
  );
}

export const formHelperTextStory: Story = {
  id: 'form-helper-text',
  title: 'FormHelperText',
  render: () => <FormHelperTextStory />,
};
