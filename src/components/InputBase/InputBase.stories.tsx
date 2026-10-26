import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { FormControl } from '../FormControl';
import { InputBase } from './InputBase';

export function InputBaseStory() {
  return (
    <Stack spacing="xl">
      <Example title="Single line, adornments and multiline">
        <Stack spacing="lg">
          <FormControl>
            <InputBase aria-label="Single line" placeholder="Single line" />
          </FormControl>
          <FormControl>
            <InputBase
              aria-label="With adornments"
              startAddon={<Icon name="search" />}
              endAddon={<Icon name="close" />}
            />
          </FormControl>
          <FormControl variant="filled">
            <InputBase aria-label="Multiline" multiline minRows={2} maxRows={4} />
          </FormControl>
        </Stack>
      </Example>
    </Stack>
  );
}

export const inputBaseStory: Story = {
  id: 'input-base',
  title: 'InputBase',
  render: () => <InputBaseStory />,
};
