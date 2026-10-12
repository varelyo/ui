import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { Select } from '../Select';
import { SelectOption } from './SelectOption';

export function SelectOptionStory() {
  return (
    <Example title="Options: grouped in a fragment, selected, disabled and a long label that sizes the field and truncates when space runs out">
      <Stack direction="row">
        <Select label="Timezone" defaultValue="bucharest" data-testid="select-timezone">
          <>
            <SelectOption value="london">London</SelectOption>
            <SelectOption value="bucharest">Bucharest</SelectOption>
          </>
          <SelectOption value="tokyo" disabled>
            Tokyo
          </SelectOption>
          <SelectOption value="honolulu">
            Honolulu, Hawaii–Aleutian Standard Time without daylight saving
          </SelectOption>
        </Select>
      </Stack>
    </Example>
  );
}

export const selectOptionStory: Story = {
  id: 'select-option',
  title: 'SelectOption',
  render: () => <SelectOptionStory />,
};
